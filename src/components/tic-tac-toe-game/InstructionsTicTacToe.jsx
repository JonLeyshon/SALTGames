const InstructionsTicTacToe = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Tic Tac Toe</h3>
        <p>The aim of this game is to get three in a row!</p>
        <p>
          On your turn, choose where you would like to go, then say the word on
          this spot.
        </p>
        <p>
          Remember to keep an eye on the other team's symbols and try to block
          them where you can!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InstructionsTicTacToe;
