import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateGameModal() {
  const [gameSize, setGameSize] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateGame = async () => {
    setIsLoading(true);
    try {
      const gameAttempt = await api.createNewGameAttempt({ size: gameSize! });
      navigate("/game/" + gameAttempt.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="create_game_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create a new game!</h3>
        <div className="mt-5">
          <select
            onChange={(e) => setGameSize(Number(e.target.value))}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select game size
            </option>
            {new Array(7).fill(0).map((_, index) => {
              const value = index + 3;
              return <option value={value}>{value}</option>;
            })}
          </select>
        </div>
        <p className="py-4">Press ESC key or click outside to close</p>
        {gameSize && (
          <button
            disabled={isLoading}
            onClick={handleCreateGame}
            className="btn btn-primary"
          >
            Create Game
          </button>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
