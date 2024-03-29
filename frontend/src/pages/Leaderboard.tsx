import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { GetUsersScoresRes } from "../../../shared/requestTypes";
import Loading from "../components/Loading";

export default function LeaderboardPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchLeaderboard();
  }, [searchParams]);

  const [userScores, setUserScores] = useState<GetUsersScoresRes>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const userScores = await api.getLeaderboard({
        pageNumber: searchParams.get("pageNumber") as string,
        pageSize: searchParams.get("pageSize") as string,
      });
      setUserScores(userScores);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const onChangePage = (n: number) => {
  //   const currentPage = Number(searchParams.get("pageNumber")) || 1;
  //   const newPageNumber = currentPage + n;
  //   if (newPageNumber < 1) return;
  //   setSearchParams({
  //     pageNumber: String(newPageNumber),
  //   });
  // };

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      <div className="flex w-[300px] flex-col space-y-4">
        {userScores.map((userScore) => (
          <div key={userScore.id} className="">
            <div className="flex w-full items-center justify-between">
              <div className="font-bold">{userScore.userId}</div>
              <div className="badge badge-success">{userScore.score}</div>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {/* <div className="flex items-center gap-2 justify-between">
          <button
            onClick={() => onChangePage(-1)}
            disabled={!(Number(searchParams.get("pageNumber")) > 0)}
            className="btn"
          >
            Back
          </button>
          <button onClick={() => onChangePage(1)} className="btn">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}
