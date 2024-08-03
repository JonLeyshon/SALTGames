import React, { useEffect, useState } from "react";
import "../../css/Intro.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSoundSelection, setPlayerNames } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const PlayerSelection = () => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const speechSound = useSelector(selectSoundSelection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!speechSound) {
      navigate("/");
    }
  }, []);

  const handlePlayerOneChange = (e) => {
    setPlayerOne(e.target.value);
  };

  const handlePlayerTwoChange = (e) => {
    setPlayerTwo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPlayerNames({ playerOne, playerTwo }));
    navigate("/gameSelection");
  };

  return (
    <div className="player-selection">
      <h1>Player Names</h1>
      <form>
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
        {playerOne && playerTwo && (
          <button onClick={handleSubmit} className="nextButton">
            Next
          </button>
        )}
      </form>
    </div>
  );
};

export default PlayerSelection;
