import express, { NextFunction, Request, Response } from "express";
import userScoresService from "../services/userScores.service";
import { GetUsersScoresRes } from "../../shared/requestTypes";

const userScoresRouter = express.Router();

userScoresRouter.get(
  "/",
  async (
    req: Request<
      any,
      GetUsersScoresRes,
      any,
      { pageNumber?: string; pageSize?: string }
    >,
    res: Response<GetUsersScoresRes>,
    next: NextFunction
  ) => {
    try {
      const pageNumber = req.query.pageNumber
        ? Number(req.query.pageNumber)
        : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const userScores = await userScoresService.getUserScores(
        pageNumber,
        pageSize
      );

      res.status(200).send(userScores);
    } catch (error) {
      next(error);
    }
  }
);

export default userScoresRouter;
