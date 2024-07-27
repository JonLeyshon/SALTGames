import React, { useState } from "react";
import MemoryGame from "../memory-game/MemoryGame";
import "../../Intro.css";

const PlayerSelection = () => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [playersSet, setPlayersSet] = useState(false);

  const handlePlayerOneChange = (e) => {
    setPlayerOne(e.target.value);
  };

  const handlePlayerTwoChange = (e) => {
    setPlayerTwo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayersSet(true);
  };

  if (playersSet) {
    return <MemoryGame playerOne={playerOne} playerTwo={playerTwo} />;
  }

  return (
    <div className="player-selection">
      <h1>Player Names</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username1">Enter player one's name</label>
          <input
            id="username1"
            name="username1"
            type="text"
            value={playerOne}
            onChange={handlePlayerOneChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username2">Enter player two's name</label>
          <input
            id="username2"
            name="username2"
            type="text"
            value={playerTwo}
            onChange={handlePlayerTwoChange}
          />
        </div>
        <button type="submit" className="start-button">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerSelection;
