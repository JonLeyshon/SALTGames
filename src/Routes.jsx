import { Routes, Route } from "react-router-dom";
import PairSelection from "./components/intro/PairSelection";
import PlayerSelection from "./components/intro/PlayerSelection";
import GameSelection from "./components/intro/GameSelection";
import MemoryGame from "./components/memory-game/MemoryGame";
import TicTacToe from "./components/tic-tac-toe-game/TicTacToe";
import CheekyMonkey from "./components/cheeky-monkey-game/CheekyMonkey";

const RoutesFile = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PairSelection />} />
        <Route path="/players" element={<PlayerSelection />} />
        <Route path="/gameSelection" element={<GameSelection />} />
        <Route path="/memoryGame" element={<MemoryGame />} />
        <Route path="/ticTacToe" element={<TicTacToe />} />
        <Route path="/cheekyMonkey" element={<CheekyMonkey />} />
      </Routes>
    </>
  );
};

export default RoutesFile;
