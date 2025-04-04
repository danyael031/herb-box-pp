-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantId" INTEGER NOT NULL,
    "airHumidity" INTEGER NOT NULL,
    "groundHumidity" INTEGER NOT NULL,
    "temperature" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requiredAction" TEXT NOT NULL DEFAULT 'NONE',
    CONSTRAINT "History_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("airHumidity", "groundHumidity", "id", "plantId", "requiredAction", "temperature", "timestamp") SELECT "airHumidity", "groundHumidity", "id", "plantId", "requiredAction", "temperature", "timestamp" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
