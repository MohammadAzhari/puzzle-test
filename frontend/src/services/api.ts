import {
  ApplyMoveReq,
  ApplyMoveRes,
  GetGameAttemptRes,
  GetUserScoresReqQuery,
  GetUsersScoresRes,
  NewGameAttemptReq,
  NewGameAttemptRes,
} from "../../../shared/requestTypes";
import http from "../config/config";

const api = {
  createNewGameAttempt: async (
    req: NewGameAttemptReq
  ): Promise<NewGameAttemptRes> => {
    return handler(http.post("/api/game_attempts", req));
  },

  applyMove: async (req: ApplyMoveReq): Promise<ApplyMoveRes> => {
    return handler(http.put("/api/game_attempts", req));
  },

  getGameAttempt: async (gameAttemptId: string): Promise<GetGameAttemptRes> => {
    return handler(http.get("/api/game_attempts/" + gameAttemptId));
  },

  getLeaderboard: async (
    query: GetUserScoresReqQuery
  ): Promise<GetUsersScoresRes> => {
    return handler(http.get("/api/leaderboard", { params: query }));
  },
};

export const handler = async (req: Promise<{ data: any }>) => {
  try {
    const { data } = await req;
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default api;
