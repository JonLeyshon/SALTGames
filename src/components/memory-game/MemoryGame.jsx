import { useEffect, useState } from "react";
import "../../MemoryGame.css";
import SingleCard from "./SingleCard";

const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

const MemoryGame = ({ playerOne, playerTwo }) => {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [turnOne, setTurnOne] = useState(null);
  const [turnTwo, setTurnTwo] = useState(null);
  const [whosTurn, setWhosTurn] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [winnerScript, setWinnerScript] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setShuffledCards(shuffledCards);
    setTurnOne(null);
    setTurnTwo(null);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setWinnerScript("");
    setGameStarted(true);
    RandomStart();
  };

  const handleCardChoice = (card) => {
    if (!winnerScript) {
      turnOne ? setTurnTwo(card) : setTurnOne(card);
    }
  };

  const RandomStart = () => {
    const randomNum = Math.round(Math.random() * 2);
    setWhosTurn(randomNum === 1 ? playerOne : playerTwo);
  };

  const resetTurns = () => {
    setTurnOne(null);
    setTurnTwo(null);
    setDisabled(false);
    setWhosTurn((prevTurn) => (prevTurn === playerOne ? playerTwo : playerOne));
  };

  const checkGameOver = () => {
    if (!gameStarted) return;
    const allMatched = shuffledCards.every((card) => card.matched === true);
    if (allMatched) {
      setWinnerScript(
        "Game Over! " +
          (playerOneScore > playerTwoScore
            ? `${playerOne} wins!`
            : playerOneScore < playerTwoScore
            ? `${playerTwo} wins!`
            : "It's a tie!")
      );
    }
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (turnOne && turnTwo) {
      setDisabled(true);
      if (turnOne.src === turnTwo.src) {
        setShuffledCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === turnOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        if (whosTurn === playerOne) {
          setPlayerOneScore((prevScore) => prevScore + 1);
        } else {
          setPlayerTwoScore((prevScore) => prevScore + 1);
        }
        setTimeout(() => resetTurns(), 1000);
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [turnOne, turnTwo]);

  useEffect(() => {
    checkGameOver();
  }, [shuffledCards]);

  const turnColor = whosTurn === playerOne ? "lightgreen" : "yellow";

  return (
    <div className="memory-game">
      <h2 style={{ color: winnerScript ? "white" : turnColor }}>
        {winnerScript || `${whosTurn} Turn`}
      </h2>
      <h3>{`${playerOne}'s score: ${playerOneScore}`}</h3>
      <h3>{`${playerTwo}'s score: ${playerTwoScore}`}</h3>

      <div className="card-grid">
        {shuffledCards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleCardChoice={handleCardChoice}
            flipped={card === turnOne || card === turnTwo || card.matched}
            disabled={disabled}
            whosTurn={whosTurn}
          />
        ))}
      </div>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
};

export default MemoryGame;
