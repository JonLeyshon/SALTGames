import { Tooltip } from "react-tooltip";

const SingleCard = ({
  card,
  handleCardChoice,
  flipped,
  disabled,
  whosTurn,
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleCardChoice(card);
    }
  };

  return (
    <div className={`cardMemory ${flipped ? "flipped" : ""}`}>
      <div className="inner">
        <img
          className="front"
          src={card.src}
          alt="card front"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={card.word}
        />

        <img
          className="back"
          src="/img/cover.jpg"
          onClick={handleClick}
          alt="card back"
        />
        <Tooltip id="my-tooltip" place="top" type="dark" effect="float" />
        {!flipped ? <p className="cardNumber">{card.id}</p> : ""}
      </div>
    </div>
  );
};

export default SingleCard;
