import { agentApp } from "@/agentApp";
import { LLMReqBody } from "@/types/llm";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    let userRequest = req.body as LLMReqBody;

    const historyData = await prisma.history.findMany({where: {plantId: 1}, take: 1, orderBy : {timestamp: 'desc'} })

    if(historyData.length === 0){
      throw new Error("No info")
    }

    const sensors = historyData[0]

    const sensorsValues = {
      temperature: `${sensors.temperature}`,
      ambient_humidity: `${sensors.airHumidity}%`,
      soil_humidity: `${sensors.groundHumidity}%`,
    }

    const systemInputSensors = `
Entrada:

Temperatura: ${sensorsValues.temperature}
Humedad ambiental: ${sensorsValues.ambient_humidity}
Humedad de tierra: ${sensorsValues.soil_humidity}
    `

    const agentFinalState = await agentApp.invoke(
      { messages: [new SystemMessage(systemInputSensors) ,new HumanMessage(userRequest.userMessage)] },
      { configurable: { thread_id: "default"} },
    );

    res.status(200).json({response: agentFinalState.messages[agentFinalState.messages.length - 1].content})
  }

}
