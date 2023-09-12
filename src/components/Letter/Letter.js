import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";

import "./Letter.css";

const Letter = ({ y, attempt }) => {
  const {
    board,
    disabledLetters,
    wrongPosLetters,
    correctLetters,
    attempt: at1,
  } = useContext(GameContext);
  const [className, setClassName] = useState("");

  useEffect(() => {
    setClassName(() => {
      let className = "Letter ";
      if (at1 === attempt) {
        if (correctLetters.includes(board[attempt][y])) {
          className += " disabled";
        } else if (wrongPosLetters.includes(board[attempt][y])) {
          className += " wrong-position";
        } else if (disabledLetters.includes(board[attempt][y])) {
          className += " correct";
        }
      }
      return className;
    });
  }, [board, attempt]);

  return <div className={className}>{board[attempt][y]}</div>;
};

export default Letter;
