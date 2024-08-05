import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectPlayerNames,
  selectSyllableSelection,
} from "../../redux/userSlice";
import { selectImages } from "../../redux/imagesSlice";
import CheekyMonkeySingleCard from "./CheekyMonkeySingleCard";
import { useNavigate } from "react-router";

const cardFronts = [
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/water-melon.png", value: 3 },
  { src: "../../../public/img/water-melon.png", value: 3 },
  { src: "../../../public/img/water-melon.png", value: 3 },
  { src: "../../../public/img/water-melon.png", value: 3 },
  { src: "../../../public/img/monkey.png", value: 0 },
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
  const syllables = useSelector(selectSyllableSelection);
  const navigate = useNavigate();

  console.log(winnerMessage);
  console.log("count " + count);
  console.log(finished);
  console.log("length" + shuffledCards.length);

  useEffect(() => {
    const cards = syllables ? cardFronts : [...cardFronts, ...cardFronts];
    shuffleAndAttachCards(cards);
  }, [images, syllables]);

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
    const shuffledFronts = shuffleArray([...cards]);
    const shuffledBacks = shuffleArray([...images]);
    const pairedCards = shuffledBacks.map((image, index) => ({
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

  return (
    <>
      <div className="container">
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
              <img src="../../../public/img/banana.png" alt="bananas" />
              <p className="keyInfo"> 1 Points</p>
            </div>
            <div className="key2">
              <img src="../../../public/img/water-melon.png" alt="melons" />
              <p className="keyInfo"> 3 Points</p>
            </div>
            <div className="key1">
              <img src="../../../public/img/monkey.png" alt="monkey" />
              <p className="keyInfo"> Monkeys eat your points! </p>
            </div>
            <button className="newGameButton" onClick={handleNewGame}>
              {" "}
              New Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheekyMonkey;
