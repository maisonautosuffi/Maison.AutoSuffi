-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "model" TEXT,
    "collection" TEXT,
    "surface" INTEGER,
    "hasTerrain" BOOLEAN,
    "terrainSurface" INTEGER,
    "orientation" TEXT,
    "budget" TEXT,
    "chatSessionId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "source" TEXT NOT NULL DEFAULT 'WEBSITE',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_chatSessionId_fkey" FOREIGN KEY ("chatSessionId") REFERENCES "ChatSession" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
