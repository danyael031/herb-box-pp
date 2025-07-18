
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const agentModel = new ChatOpenAI({ temperature: 0 });

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
export const agentApp = createReactAgent({
  llm: agentModel,
  tools: [],
  checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
