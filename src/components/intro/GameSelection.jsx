import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectSoundSelection } from "../../redux/userSlice";
import { useEffect } from "react";

const GameSelection = () => {
  const navigate = useNavigate();
  const speechSound = useSelector(selectSoundSelection);

  useEffect(() => {
    if (!speechSound) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <p
        className="backButton"
        onClick={() => {
          navigate("/players");
        }}
      >
        Back to Player Names
      </p>
      <div className="gamesContainer">
        <h1>What game would you like to play?</h1>
        <div className="games">
          <div
            className="gameSelection"
            onClick={() => {
              navigate("/ticTacToe");
            }}
          >
            <h3>Tic Tac Toe</h3>
            <img src="../../../public/img/tic-tac-toe.png" />
          </div>
          <div
            className="gameSelection"
            onClick={() => {
              navigate("/memoryGame");
            }}
          >
            <h3>Memory Game</h3>
            <img src="../../../public/img/memory.png" />
          </div>
          <div
            className="gameSelection"
            onClick={() => {
              navigate("/cheekyMonkey");
            }}
          >
            <h3>Cheeky Monkey Game</h3>
            <img src="../../../public/img/monkey.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSelection;
