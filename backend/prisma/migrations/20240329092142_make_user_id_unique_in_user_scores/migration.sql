/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_scores_userId_key" ON "user_scores"("userId");
