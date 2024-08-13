import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectPlayerNames,
  selectSyllableSelection,
} from "../../redux/userSlice";
import { selectImages } from "../../redux/imagesSlice";
import CheekyMonkeySingleCard from "./CheekyMonkeySingleCard";
import { useNavigate } from "react-router";
import InstructionsModal from "./InstructionsCheekyMonkey";

const cardFronts = [
  { src: "/img/banana.png", value: 1 },
  { src: "/img/banana.png", value: 1 },
  { src: "/img/banana.png", value: 1 },
  { src: "/img/banana.png", value: 1 },
  { src: "/img/water-melon.png", value: 3 },
  { src: "/img/water-melon.png", value: 3 },
  { src: "/img/water-melon.png", value: 3 },
  { src: "/img/water-melon.png", value: 3 },
  { src: "/img/monkey.png", value: 0 },
];

const CheekyMonkey = () => {
  const players = useSelector(selectPlayerNames);
  const { playerOne, playerTwo } = players;
  const images = useSelector(selectImages);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [count, setCount] = useState(0);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const syllables = useSelector(selectSyllableSelection);
  const navigate = useNavigate();

  useEffect(() => {
    const cards = syllables ? cardFronts : [...cardFronts, ...cardFronts];
    shuffleAndAttachCards(cards);
    handleNewGame();
  }, [images]);

  useEffect(() => {
    checkForWin();
    if (!images.length) {
      navigate("/");
    }
  }, [count, finished]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffleAndAttachCards = (cards) => {
    if (!cards.length || !images.length) return;

    const shuffledFronts = shuffleArray([...cards]);
    const shuffledBacks = shuffleArray([...images]);

    const validImageCount = Math.min(
      shuffledBacks.length,
      shuffledFronts.length
    );
    const pairedCards = shuffledBacks
      .slice(0, validImageCount)
      .map((image, index) => ({
        ...image,
        front: shuffledFronts[index],
        id: Math.random(),
      }));
    setShuffledCards(pairedCards);
  };

  const handleTurn = (card) => {
    setCount((prevCount) => prevCount + 1);
    if (count % 2 === 0) {
      if (card.front.value > 0) {
        setPlayerOneScore((prevScore) => prevScore + card.front.value);
      } else {
        setPlayerOneScore(0);
      }
    } else {
      if (card.front.value > 0) {
        setPlayerTwoScore((prevScore) => prevScore + card.front.value);
      } else {
        setPlayerTwoScore(0);
      }
    }
    if (count === shuffledCards.length - 1) {
      setFinished(true);
      return;
    }
  };

  const checkForWin = () => {
    if (finished) {
      if (playerOneScore > playerTwoScore) {
        setWinnerMessage(`${playerOne} Won!`);
      } else if (playerTwoScore > playerOneScore) {
        setWinnerMessage(`${playerTwo} Won!`);
      } else {
        setWinnerMessage("It's a draw!");
      }
    }
  };

  const handleNewGame = () => {
    setCount(0);
    setFinished(false);
    const cards = syllables ? cardFronts : [...cardFronts, ...cardFronts];
    shuffleAndAttachCards(cards);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setWinnerMessage("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p
        className="backButton"
        onClick={() => {
          navigate("/gameSelection");
        }}
      >
        Back to Games
      </p>
      <div className="cm-container">
        <div className="gameContainer">
          <h1>Cheeky Monkey Game</h1>
          <div
            className={syllables ? "card-container" : "card-container large"}
          >
            {shuffledCards.map((card) => (
              <CheekyMonkeySingleCard
                key={card.id}
                card={card}
                handleTurn={handleTurn}
              />
            ))}
          </div>
        </div>

        <div className="scores">
          <h2>
            {finished
              ? winnerMessage
              : count % 2 === 0
              ? `${playerOne}'s turn`
              : `${playerTwo}'s turn`}
          </h2>

          <h3> {`${playerOne}'s score: ${playerOneScore}`}</h3>
          <h3> {`${playerTwo}'s score: ${playerTwoScore}`}</h3>
          <div className="key">
            <div className="key1">
              <img src="/img/banana.png" alt="bananas" />
              <p className="keyInfo"> 1 Points</p>
            </div>
            <div className="key2">
              <img src="/img/water-melon.png" alt="melons" />
              <p className="keyInfo"> 3 Points</p>
            </div>
            <div className="key1">
              <img src="/img/monkey.png" alt="monkey" />
              <p className="keyInfo"> Monkeys eat your points! </p>
            </div>
            <button className="newGameButton" onClick={handleNewGame}>
              New Game
            </button>
            <button className="instructions" onClick={openModal}>
              Instructions?
            </button>
            <InstructionsModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheekyMonkey;
