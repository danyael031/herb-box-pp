import { agentApp } from "@/agentApp";
import { HumanMessage } from "@langchain/core/messages";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const agentFinalState = await agentApp.invoke(
    { messages: [new HumanMessage("what is the current weather in sf")] },
    { configurable: { thread_id: 42 } },
  );

  res.status(200).json({response: agentFinalState.messages[agentFinalState.messages.length - 1].content})

}
