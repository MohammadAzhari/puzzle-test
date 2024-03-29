import gameAttemptsData from "../data/gameAttempts.data";
import userScoresData from "../data/userScores.data";
import { ServerError } from "../utils/serverError";
import {
  calculateScore,
  generateGameElements,
  isUserWin,
  validateMove,
} from "../utils/util";

const gameAttemptsService = {
  createNewGameAttempt: async (userId: string, size: number) => {
    // generate gameElement base on the size
    const gameElements = generateGameElements(size);
    // insert to database
    const gameAttempt = await gameAttemptsData.create({
      gameElements: JSON.stringify(gameElements),
      userId,
    });

    return gameAttempt;
  },

  applyMove: async (
    userId: string,
    gameAttemptId: number,
    from: [number, number],
    to: [number, number],
    timeInSeconds: number
  ) => {
    // getGameFrom Database
    const gameAttempt = await gameAttemptsData.getById(gameAttemptId, userId);
    if (!gameAttempt) {
      throw new ServerError("game not found", 404);
    }

    const gameElements: number[][] = JSON.parse(gameAttempt.gameElements);
    // validateMove
    const isValid = validateMove(gameElements, from, to);
    if (!isValid) {
      throw new ServerError("invalid move", 400);
    }
    // check if the user wins: calc score and update the userScores
    const isWins = isUserWin(gameElements);

    if (isWins) {
      const score = calculateScore(gameElements.length, timeInSeconds);
      await userScoresData.create({ score, userId });
      gameAttempt.status = "COMPLETED";
      gameAttempt.score = score;
    }
    // update the record
    const updatedGameAttempt = await gameAttemptsData.update(gameAttemptId, {
      gameElements: JSON.stringify(gameElements),
      score: gameAttempt.score,
      status: gameAttempt.status,
      timeInSeconds: timeInSeconds,
    });

    // return the gameElements
    return updatedGameAttempt;
  },

  getGameAttempt: async (userId: string, gameAttemptId: number) => {
    // get game Attempt
    const gameAttempt = await gameAttemptsData.getById(gameAttemptId, userId);
    if (!gameAttempt) {
      throw new ServerError("game not found", 404);
    }
    // return the gameAttempt
    return gameAttempt;
  },
};

export default gameAttemptsService;
