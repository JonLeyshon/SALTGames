import "../../css/cheekyMonkey.css";
import { Tooltip } from "react-tooltip";

const CheekyMonkeySingleCard = ({ card }) => {
  console.log(card);
  return (
    <>
      <div key={card.id} className="card">
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
    </>
  );
};

export default CheekyMonkeySingleCard;
