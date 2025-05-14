/*
  Warnings:

  - You are about to drop the column `role` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "taskId"),
    CONSTRAINT "Assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("taskId", "userId") SELECT "taskId", "userId" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT,
    "difficulty" TEXT,
    "completed" BOOLEAN,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deadline" DATETIME NOT NULL,
    CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("authorId", "completed", "createdAt", "deadline", "description", "difficulty", "id", "title", "updatedAt") SELECT "authorId", "completed", "createdAt", "deadline", "description", "difficulty", "id", "title", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
