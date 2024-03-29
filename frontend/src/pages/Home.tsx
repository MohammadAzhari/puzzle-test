import { FiPlay, FiAward } from "react-icons/fi";
import CreateGameModal from "../components/CreateGameModal";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-4xl font-bold mb-8">Name of the Game</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() =>
              (document.getElementById("create_game_modal") as any).showModal()
            }
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <FiPlay className="mr-2" />
            Create Game
          </button>
          <Link
            to={"/leaderboard"}
            className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            <FiAward className="mr-2" />
            See Leaderboard
          </Link>
        </div>
      </div>

      {/* create game modal */}
      <CreateGameModal />
    </>
  );
}
