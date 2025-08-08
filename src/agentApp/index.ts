
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { PROMPT_PLANT_ES } from "@/promts/plantita";

const agentModel = new ChatOpenAI({ temperature: 0.5 });

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
export const agentApp = createReactAgent({
  llm: agentModel,
  tools: [],
  prompt: PROMPT_PLANT_ES,
  checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
