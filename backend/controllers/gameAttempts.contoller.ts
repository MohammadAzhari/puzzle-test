import express, { NextFunction, Request, Response } from "express";
import {
  NewGameAttemptRes,
  NewGameAttemptReq,
  ApplyMoveRes,
  ApplyMoveReq,
} from "../../shared/requestTypes";
import gameAttemptsService from "../services/gameAttempts.service";
import { Locals } from "../types/types";

const gameAttemptsRouter = express.Router();

gameAttemptsRouter.post(
  "/",
  async (
    req: Request<any, NewGameAttemptRes, NewGameAttemptReq>,
    res: Response<NewGameAttemptRes, Locals>,
    next: NextFunction
  ) => {
    try {
      const { userId } = res.locals;
      const { size } = req.body;
      const gameAttempt = await gameAttemptsService.createNewGameAttempt(
        userId,
        size
      );

      res.status(201).send(gameAttempt);
    } catch (error) {
      next(error);
    }
  }
);

gameAttemptsRouter.put(
  "/",
  async (
    req: Request<any, ApplyMoveRes, ApplyMoveReq>,
    res: Response<ApplyMoveRes, Locals>,
    next: NextFunction
  ) => {
    try {
      const { userId } = res.locals;
      const { from, to, gameAttemptId, timeInSeconds } = req.body;

      const gameAttempt = await gameAttemptsService.applyMove(
        userId,
        gameAttemptId,
        from,
        to,
        timeInSeconds
      );
      res.status(201).send(gameAttempt);
    } catch (error) {
      next(error);
    }
  }
);

gameAttemptsRouter.get(
  "/:id",
  async (
    req: Request<{ id: string }, NewGameAttemptRes>,
    res: Response<NewGameAttemptRes>,
    next
  ) => {
    try {
      const { userId } = res.locals;
      const { id } = req.params;

      const gameAttempt = await gameAttemptsService.getGameAttempt(
        userId,
        Number(id)
      );
      res.status(200).send(gameAttempt);
    } catch (error) {
      next(error);
    }
  }
);

export default gameAttemptsRouter;
