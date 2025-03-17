-- CreateTable
CREATE TABLE "Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avgAirHumidity" INTEGER NOT NULL,
    "avgGroundHumidity" INTEGER NOT NULL,
    "avgTemperature" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantId" INTEGER NOT NULL,
    "airHumidity" INTEGER NOT NULL,
    "groundHumidity" INTEGER NOT NULL,
    "temperature" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "History_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
