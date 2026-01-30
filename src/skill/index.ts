import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders,
} from 'ask-sdk-core';
import { CustomSkill } from 'ask-sdk-core/dist/skill/CustomSkill';
import {
  Response,
  SessionEndedRequest,
} from 'ask-sdk-model';
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { agentApp } from "@/agentApp";
import { prisma } from "@/utils/prisma"

//https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/develop-your-first-skill.html

//https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/host-web-service.html

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Hola, soy tu herb box plus plus. Puedes preguntarme el estado de las plantitas.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hola, soy tu herb box plus plus. Puedes preguntarme el estado de las plantitas.', speechText)
      .getResponse();
  },
};

const PlantStatusIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'PlantStatusIntent';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    let speechText = 'Default message';

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
          { messages: [new SystemMessage(systemInputSensors) ,new HumanMessage("Hola plantita, cómo estás?")] },
          { configurable: { thread_id: "default"} },
        );
    speechText = agentFinalState.messages[agentFinalState.messages.length - 1].content.toString();
    console.log(speechText)

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const AskWeatherIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AskWeatherIntent';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'The weather today is sunny.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('The weather today is sunny.', speechText)
      .getResponse();
  },
};

const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'You can ask me the weather!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('You can ask me the weather!', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const CustomErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I don\'t understand your command. Please say it again.')
      .reprompt('Sorry, I don\'t understand your command. Please say it again.')
      .getResponse();
  }
};

export const PlantitaSkill: CustomSkill = SkillBuilders.custom()
  .addRequestHandlers(
    PlantStatusIntentHandler,
    LaunchRequestHandler,
    AskWeatherIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(CustomErrorHandler)
  .create();
