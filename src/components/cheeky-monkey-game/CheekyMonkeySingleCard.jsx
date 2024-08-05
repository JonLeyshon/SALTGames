import { useState } from "react";
import "../../css/cheekyMonkey.css";
import { Tooltip } from "react-tooltip";

const CheekyMonkeySingleCard = ({ card, handleTurn }) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    if (flipped) {
      return;
    }
    setFlipped(true);
    handleTurn(card);
  };

  return (
    <div
      key={card.id}
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <img
        src={card.src}
        alt={`Back of ${card.word}`}
        className="card back"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={card.word}
      />
      <img
        src={card.front.src}
        alt={`Front of ${card.word}`}
        className="card front"
      />
      <Tooltip id="my-tooltip" place="top" type="dark" effect="float" />
    </div>
  );
};

export default CheekyMonkeySingleCard;
