const InstructionsCheekyMonkeyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Cheeky Monkeys</h3>
        <p>
          The aim of this game is to turn over the cards and get the most points
          from your fruit, but watch out for the cheeky monkeys because they
          will eat all your fruit and you'll lose your points!
        </p>
        <p>
          On your turn, say the word that you would like to turn over and reveal
          the fruit (or monkey!) underneath.
        </p>
        <p>whoever has the most points when all the cards are flipped, wins!</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InstructionsCheekyMonkeyModal;
