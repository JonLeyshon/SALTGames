import { useEffect, useState } from "react";
import "../../css/MemoryGame.css";
import SingleCard from "./SingleCard";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  selectSoundSelection,
  selectSyllableSelection,
} from "../../redux/userSlice";

const MemoryGame = ({ playerOne, playerTwo }) => {
  const speechSound = useSelector(selectSoundSelection);
  const syllables = useSelector(selectSyllableSelection);
  const [cardImages, setCardImages] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [turnOne, setTurnOne] = useState(null);
  const [turnTwo, setTurnTwo] = useState(null);
  const [whosTurn, setWhosTurn] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [winnerScript, setWinnerScript] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const handleCardRetrieval = async (speech_sound, syllables) => {
    try {
      let results;

      if (syllables) {
        results = await axios.get(
          `http://localhost:6002/get?speech_sound=${speech_sound}&syllables=${syllables}`
        );
      } else {
        results = await axios.get(
          `http://localhost:6002/get?speech_sound=${speech_sound}`
        );
      }

      if (results.data.length) {
        const newCardImages = results.data.map((result) => ({
          src: result.image_path,
          matched: false,
          word: result.word,
        }));
        setCardImages(newCardImages);
        shuffleCards(newCardImages);
      } else {
        console.error("Retrieval failed");
      }
    } catch (error) {
      console.error("Retrieval failed:", error);
    }
  };

  const shuffleCards = (cards) => {
    const randomizedCards = cards.sort(() => Math.random() - 0.5);

    const selectedCards = randomizedCards.slice(0, 9);

    const duplicatedCards = [...selectedCards, ...selectedCards].sort(
      () => Math.random() - 0.5
    );

    // Assign a unique id to each card
    const shuffledCards = duplicatedCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));

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
    handleCardRetrieval(speechSound, syllables);
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
        setTimeout(() => resetTurns(), 2000);
      }
    }
  }, [turnOne, turnTwo]);

  useEffect(() => {
    checkGameOver();
  }, [shuffledCards]);

  const turnColor = whosTurn === playerOne ? "green" : "blue";

  return (
    <div className="memory-game">
      <h2 style={{ color: winnerScript ? "Black" : turnColor }}>
        {winnerScript || `${whosTurn}'s Turn`}
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
      <button
        className="newGameButton"
        onClick={() => shuffleCards(cardImages)}
      >
        New Game
      </button>
    </div>
  );
};

export default MemoryGame;
