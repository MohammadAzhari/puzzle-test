import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import LeaderboardPage from "./pages/Leaderboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/game/:id" element={<GamePage />} />
    </Routes>
  );
}
