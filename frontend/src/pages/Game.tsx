import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import Loading from "../components/Loading";
import { GetGameAttemptRes } from "../../../shared/requestTypes";
import formatTime from "../utils/formatTime";

export default function GamePage() {
  const params = useParams();
  const gameAttemptId = params.id!;

  const [gameElements, setGameElements] = useState<number[][]>();
  const [time, setTime] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    fetchGameAttempt();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (time !== undefined) {
        setTime(time + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);

  const fetchGameAttempt = async () => {
    setIsLoading(true);
    try {
      const gameAttempt = await api.getGameAttempt(gameAttemptId);
      updateGameState(gameAttempt);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGameState = (gameAttempt: GetGameAttemptRes) => {
    setTime(gameAttempt.timeInSeconds);
    setGameElements(JSON.parse(gameAttempt.gameElements));
    if (gameAttempt.status === "COMPLETED") {
      setIsGameCompleted(true);
    }
  };

  const [clickedCell, setClickedCell] = useState<[number, number]>();

  const handleClickCell = async (newClickedCell: [number, number]) => {
    if (!clickedCell) {
      return setClickedCell(newClickedCell);
    }

    try {
      const gameAttempt = await api.applyMove({
        from: clickedCell,
        to: newClickedCell,
        gameAttemptId: Number(gameAttemptId),
        timeInSeconds: time!,
      });
      updateGameState(gameAttempt);
      setClickedCell(undefined);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    <Loading />;
  }

  if (isGameCompleted) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-4xl text-success font-bold mb-8">You won!</h1>
        <Link
          to={"/"}
          className="btn btn-primary  text-white font-bold py-2 px-4 rounded"
        >
          Go to Main Screen
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-8">
          Sort all the rows from 1 to {gameElements?.length}
        </h1>
      </div>
      <div className="badge badge-success">{formatTime(time!)}</div>
      <div className="divider"></div>
      <div className="w-[350px]">
        {gameElements?.map((row, x) => (
          <>
            <div key={x} className="flex items-center justify-between">
              {row.map((cell, y) => (
                <button
                  key={y}
                  className={`btn rounded-2xl mx-1 border-solid border-2 text-center relative ${
                    clickedCell?.[0] == x && clickedCell?.[1] == y
                      ? "btn-success"
                      : ""
                  }`}
                  onClick={() => handleClickCell([x, y])}
                >
                  {cell}
                </button>
              ))}
            </div>
            <div className="divider"></div>
          </>
        ))}
      </div>
    </div>
  );
}
