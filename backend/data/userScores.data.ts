import { UserScore } from "@prisma/client";
import prisma from "../config/prisma";

const userScoresData = {
  create:  async (data: { score: number; userId: string }) => {
    const old = await prisma.userScore.findFirst({
      where: {
        userId: data.userId,
      }
    })
    if (old) {
      return prisma.userScore.update({
        where: {
          userId: data.userId,
        },
        data: {
          score: old.score + data.score
        }
      })
    }
    return prisma.userScore.create({
      data,
    });
  },

  getHighestScores: (pageNumber: number, pageSize: number) => {
    return prisma.userScore.findMany({
      orderBy: {
        score: "desc",
      },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });
  },
};

export default userScoresData;
