-- CreateEnum
CREATE TYPE "GameAttemptStatus" AS ENUM ('CANCELED', 'ON_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "game_attempts" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "GameAttemptStatus" NOT NULL,
    "score" INTEGER NOT NULL,
    "timeInSeconds" INTEGER NOT NULL,
    "gameElements" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "game_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_scores" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "GameAttemptStatus" NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "user_scores_pkey" PRIMARY KEY ("id")
);
