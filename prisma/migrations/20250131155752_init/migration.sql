/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "pin" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "irrigate" TEXT NOT NULL,
    "pump" TEXT NOT NULL,
    "chartColor" TEXT NOT NULL,
    "heartbeat" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    CONSTRAINT "Action_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pump" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "vccPin" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PumpAction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pumpId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    CONSTRAINT "PumpAction_pumpId_fkey" FOREIGN KEY ("pumpId") REFERENCES "Pump" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Switch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vccPin" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SwitchAction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "switchId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    CONSTRAINT "SwitchAction_switchId_fkey" FOREIGN KEY ("switchId") REFERENCES "Switch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionStack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryNo" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "enum" INTEGER NOT NULL,
    "created" DATETIME NOT NULL,
    "processed" DATETIME NOT NULL
);
