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
    <div className={`card ${flipped ? "flipped" : ""}`}>
      <div className="inner">
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="./public/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
