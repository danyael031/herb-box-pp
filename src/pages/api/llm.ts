import { agentApp } from "@/agentApp";
import { LLMReqBody } from "@/types/llm";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    let userRequest = req.body as LLMReqBody;

    const sensorsValues = {
      temperature: "45",
      ambient_humidity: "10%",
      soil_humidity: "10%"
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
