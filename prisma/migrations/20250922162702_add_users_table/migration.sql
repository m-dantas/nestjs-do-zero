-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tasks" ("completed", "createdAt", "description", "id", "name") SELECT "completed", "createdAt", "description", "id", "name" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
