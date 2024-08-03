import { Routes, Route } from "react-router-dom";
import PairSelection from "./components/intro/PairSelection";
import PlayerSelection from "./components/intro/PlayerSelection";
import MemoryGame from "./components/memory-game/MemoryGame";
import TicTacToe from "./components/tic-tac-toe-game/TicTacToe";

const RoutesFile = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PairSelection />} />
        <Route path="/players" element={<PlayerSelection />} />
        <Route path="/memoryGame" element={<MemoryGame />} />
        <Route path="/ticTacToe" element={<TicTacToe />} />
      </Routes>
    </>
  );
};

export default RoutesFile;
