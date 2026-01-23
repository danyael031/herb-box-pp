// Seed setup based on:
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
import { prisma } from "@/utils/prisma"

async function main() {
  const plants = await prisma.plant.createMany({
    data: [
      {
        id: 1,
        name: "plant 1",
        code: "0",
        avgAirHumidity: 0,
        avgGroundHumidity: 0,
        avgTemperature: 0,
        timestamp: new Date()
      },

      {
        id: 2,
        name: "plant 2",
        code: "0",
        avgAirHumidity: 0,
        avgGroundHumidity: 0,
        avgTemperature: 0,
        timestamp: new Date()
      },
    ]
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })