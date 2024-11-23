import { Bedrock } from "@langchain/community/llms/bedrock";
import type { NextApiRequest, NextApiResponse } from "next";
import { PromptTemplate } from "@langchain/core/prompts";

const llm = new Bedrock({
  model: "amazon.titan-embed-text-v2:0",
  region: process.env.BEDROCK_AWS_REGION,
  credentials: {
    accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY ?? "",
  },
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): Promise<void> {
  const { method } = req;
  if (method == "POST") {
    const prompt = PromptTemplate.fromTemplate(
      "Human: How to say {input} in {output_language}:\nAssistant:"
    );
    
    const chain = prompt.pipe(llm);
    await chain.invoke({
      output_language: "German",
      input: "I love programming.",
    });
  }
}
