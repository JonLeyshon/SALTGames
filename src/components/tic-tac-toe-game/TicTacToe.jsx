import "../../css/ticTacToe.css";
import circle_icon from "../../../public/img/circle.png";
import cross_icon from "../../../public/img/cross.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPlayerNames, selectSoundSelection } from "../../redux/userSlice";
import { selectImages } from "../../redux/imagesSlice";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router";
import InstructionsModal from "./InstructionsTicTacToe";

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const players = useSelector(selectPlayerNames);
  const { playerOne, playerTwo } = players;
  const [whosTurn, setWhosTurn] = useState(playerOne);
  const images = useSelector(selectImages);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const selectedSound = useSelector(selectSoundSelection);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!images || !images.length) {
      navigate("/");
    }

    shuffleCards();
  }, []);

  useEffect(() => {
    shuffleCards();
    newGame();
  }, [images]);

  const shuffleCards = () => {
    const shuffledCards = [...images]
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);
    setCards(shuffledCards);
  };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (board) => {
    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const toggle = (num) => {
    if (lock || data[num]) return;

    const newData = [...data];
    newData[num] = whosTurn;
    setData(newData);
    setCount(count + 1);

    const gameWinner = checkWin(newData);
    if (gameWinner) {
      setLock(true);
      setWinner(whosTurn);
    } else if (newData.every((cell) => cell)) {
      setLock(true);
      setWinner("draw");
    } else {
      setWhosTurn(whosTurn === playerOne ? playerTwo : playerOne);
    }
  };

  const newGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(null);
    setWhosTurn(playerOne);
    shuffleCards();
  };

  const Box = ({ index }) => (
    <div
      className="boxes"
      onClick={() => toggle(index)}
      style={{ backgroundImage: `url(${cards[index]?.src})` }}
      data-tooltip-id="my-tooltip"
      data-tooltip-content={cards[index]?.word}
    >
      {data[index] && (
        <img
          src={data[index] === playerOne ? cross_icon : circle_icon}
          alt={data[index]}
        />
      )}
    </div>
  );

  const currentIcon = whosTurn === playerOne ? cross_icon : circle_icon;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <p
        className="backButton"
        onClick={() => {
          navigate("/gameSelection");
        }}
      >
        Back to Games
      </p>
      <div className="game">
        <h1 className="title">Tic Tac Toe</h1>
        {winner ? (
          <h2 className="whosTurn">
            {winner === "draw"
              ? "It's a draw! Play again?"
              : `${winner} wins! Play again?`}
          </h2>
        ) : (
          <h2 className="whosTurn">
            {`${whosTurn}'s turn `}
            <img
              src={currentIcon}
              alt="Current turn icon"
              style={{ width: "24px", height: "24px" }}
            />
          </h2>
        )}
        <button className="newGameButton" onClick={newGame}>
          New Game
        </button>
        <button className="instructions" onClick={openModal}>
          Instructions?
        </button>
        <InstructionsModal isOpen={isModalOpen} onClose={closeModal} />
        <div className="board">
          {cards.length === 9 && (
            <>
              {[0, 1, 2].map((row) => (
                <div className={`row${row + 1}`} key={row}>
                  {[0, 1, 2].map((col) => (
                    <Box index={row * 3 + col} key={col} />
                  ))}
                </div>
              ))}
            </>
          )}
          <Tooltip id="my-tooltip" place="top" type="dark" effect="float" />
        </div>
      </div>
      <div className="turnCounter"></div>
    </div>
  );
};

export default TicTacToe;
