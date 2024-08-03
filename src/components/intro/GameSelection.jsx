import { useNavigate } from "react-router";

const GameSelection = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default GameSelection;
