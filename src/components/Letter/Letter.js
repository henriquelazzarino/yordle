import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";

import "./Letter.css";

const Letter = ({ y, attempt, correctPlace, wrongPlace, nonExistent }) => {
  const {
    board,
    attempt: currentAttempt,
  } = useContext(GameContext);

  const [className, setClassName] = useState("");

  useEffect(() => {
    if (className.length === 0 && currentAttempt === attempt) {
      if (correctPlace.includes(board[attempt][y])) {
        setClassName("correct");
      } else if (wrongPlace.includes(board[attempt][y])) {
        setClassName("wrong-position");
      } else if (nonExistent.includes(board[attempt][y]) && board[attempt][y] !== null) {
        setClassName("disabled");
      } else {
        setClassName("");
      }
    }

    if (board[attempt][y] && className.includes("exists")) {
      setClassName(c => c + " exists");
    } else {
      setClassName(c => c.replace(" exists", ""));
    }

    console.log(board)
  }, [correctPlace, wrongPlace, nonExistent, board, attempt, y, currentAttempt]);

  return <div className={"Letter " + className}>{board[attempt][y]}</div>;
};

export default Letter;
