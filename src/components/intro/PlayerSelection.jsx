import React, { useState } from "react";
import MemoryGame from "../memory-game/MemoryGame";
import "../../css/Intro.css";
import { useDispatch } from "react-redux";
import { setPlayerNames } from "../../redux/userSlice";

const PlayerSelection = ({ speechSound }) => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [playersSet, setPlayersSet] = useState(false);
  const dispatch = useDispatch();

  const handlePlayerOneChange = (e) => {
    setPlayerOne(e.target.value);
  };

  const handlePlayerTwoChange = (e) => {
    setPlayerTwo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPlayerNames({ playerOne, playerTwo }));
    setPlayersSet(true);
  };

  if (playersSet) {
    return (
      <MemoryGame
        playerOne={playerOne}
        playerTwo={playerTwo}
        speechSound={speechSound}
      />
    );
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
            required
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
            required
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
