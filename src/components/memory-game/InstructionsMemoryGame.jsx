const InstructionsMemoryGameModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Memory Game</h3>
        <p>The aim of this game is to turn over the matching cards.</p>
        <p>
          On your turn, choose the number you would like to turn over, then say
          the word. Turn over the next card and try to find a pair, make sure to
          say both words before they flip back!
        </p>
        <p>whoever turns over the most pairs wins!</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InstructionsMemoryGameModal;
