import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectPlayerNames } from "../../redux/userSlice";
import { selectImages } from "../../redux/imagesSlice";
import CheekyMonkeySingleCard from "./CheekyMonkeySingleCard";

const cardFronts = [
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/banana.png", value: 1 },
  { src: "../../../public/img/water-melon.png", value: 3 },
  { src: "../../../public/img/water-melon.png", value: 3 },
  { src: "../../../public/img/monkey.png", value: 0 },
];

const CheekyMonkey = () => {
  const players = useSelector(selectPlayerNames);
  const { playerOne, playerTwo } = players;
  const images = useSelector(selectImages);
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    shuffleAndAttachCards();
  }, [images]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffleAndAttachCards = () => {
    const shuffledFronts = shuffleArray([...cardFronts]);
    const pairedCards = images.map((image, index) => ({
      ...image,
      front: shuffledFronts[index],
      id: Math.random(),
    }));
    setShuffledCards(pairedCards);
  };

  return (
    <div className="container">
      <div className="titleAndScores">
        <h1>Cheeky Monkey Game</h1>
      </div>
      <div className="card-container">
        {shuffledCards.map((card, index) => (
          <CheekyMonkeySingleCard key={card.id} card={card} />
          //   <div key={index} className="card">
          //     <img
          //       src={card.src}
          //       alt={`Back of ${card.word}`}
          //       className="card-back"
          //     />
          //     <img
          //       src={card.front.src}
          //       alt={`Front of ${card.word}`}
          //       className="card-front"
          //     />
          //   </div>
        ))}
      </div>
    </div>
  );
};

export default CheekyMonkey;
