import { tool } from "@langchain/core/tools"
import { prisma } from "@/utils/prisma"

interface SensorsValues {
    temperature: null | string,
    ambient_humidity: null | string,
    soil_humidity: null | string,
}

async function getSensorsValues(): Promise<SensorsValues> {
    let sensorsValues: SensorsValues = {
        temperature: null,
        ambient_humidity: null,
        soil_humidity: null,
    }

    let historyData = null;

    try {
        historyData = await prisma.history.findMany({ where: { plantId: 1 }, take: 1, orderBy: { timestamp: 'desc' } });
    }catch(e){
        return sensorsValues;
    }

    if (historyData.length === 0) {
        return sensorsValues;
    }

    const sensors = historyData[0]

    sensorsValues = {
        temperature: `${sensors.temperature}`,
        ambient_humidity: `${sensors.airHumidity}%`,
        soil_humidity: `${sensors.groundHumidity}%`,
    }

    return sensorsValues
}

export const plantSensors = tool(getSensorsValues,
    {
        name: "get_sensors_values",
        description: "Obtener los valores actuales de los sensores",
    }
);