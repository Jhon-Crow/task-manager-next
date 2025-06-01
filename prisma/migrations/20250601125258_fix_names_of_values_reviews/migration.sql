/*
  Warnings:

  - You are about to drop the column `Taskid` on the `Rewiew` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Rewiew` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rewiew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Rewiew_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rewiew_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rewiew" ("createdAt", "id", "text", "updatedAt", "userId") SELECT "createdAt", "id", "text", "updatedAt", "userId" FROM "Rewiew";
DROP TABLE "Rewiew";
ALTER TABLE "new_Rewiew" RENAME TO "Rewiew";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
