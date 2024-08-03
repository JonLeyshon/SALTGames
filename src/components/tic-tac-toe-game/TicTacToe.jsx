import "../../css/ticTacToe.css";
import circle_icon from "../../../public/img/circle.png";
import cross_icon from "../../../public/img/cross.png";
import { useState } from "react";

const TicTacToe = () => {
  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (board) => {
    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }

    const newData = data.slice();
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    e.target.innerHTML = `<img src = '${
      newData[num] === "x" ? cross_icon : circle_icon
    }'>`;
    setCount(count + 1);

    const gameWinner = checkWin(newData);
    if (gameWinner) {
      setLock(true);
      setWinner(gameWinner);
    } else if (newData.every((cell) => cell !== "")) {
      setLock(true);
      setWinner("draw");
    }
  };

  const newGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(null);
    const boxes = document.querySelectorAll(".boxes");
    boxes.forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      {winner && (
        <div className="winner-message">
          {winner === "draw" ? "It's a draw!" : `${winner.toUpperCase()} wins!`}
        </div>
      )}
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="newGameButton" onClick={newGame}>
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;
