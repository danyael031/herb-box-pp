import { agentApp } from "@/agentApp";
import { LLMReqBody } from "@/types/llm";
import { HumanMessage } from "@langchain/core/messages";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    let userRequest = req.body as LLMReqBody;
    const agentFinalState = await agentApp.invoke(
      { messages: [new HumanMessage(userRequest.userMessage)] },
      { configurable: { thread_id: "default"} },
    );

    res.status(200).json({response: agentFinalState.messages[agentFinalState.messages.length - 1].content})
  }

}
