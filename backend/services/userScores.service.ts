import userScoresData from "../data/userScores.data";

const userScoresService = {
  getUserScores: async (pageNumber: number, pageSize: number) => {
    // get user scores by pageNumber and pageSize and return them
    const userScores = await userScoresData.getHighestScores(
      pageNumber,
      pageSize
    );
    return userScores;
  },
};

export default userScoresService;
