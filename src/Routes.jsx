import { Routes, Route } from "react-router-dom";
import PairSelection from "./components/intro/PairSelection";
import PlayerSelection from "./components/intro/PlayerSelection";

const RoutesFile = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PairSelection />} />
        <Route path="/players" element={<PlayerSelection />} />
      </Routes>
    </>
  );
};

export default RoutesFile;
