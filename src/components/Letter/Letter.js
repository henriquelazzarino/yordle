import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";

import "./Letter.css";

const Letter = ({ y, attempt, correctPlace, wrongPlace, nonExistent }) => {
  const {
    board,
    attempt: currentAttempt,
    notFound,
    size
  } = useContext(GameContext);

  const [className, setClassName] = useState("");

  useEffect(() => {

    if (((className.includes("exists") && !className.includes("disabled")) || className.length === 0) &&
        currentAttempt === attempt) {
      if (correctPlace.includes(board[attempt][y])) {
        setClassName("correct")
      } else if (wrongPlace.includes(board[attempt][y])) {
        setClassName("wrong-position");
      } else if (nonExistent.includes(board[attempt][y]) && board[attempt][y] !== null) {
        setClassName("disabled");
      } else if (!className.includes("exists")) {
        setClassName("");
      }
    } 
  }, [correctPlace, wrongPlace, nonExistent, board, attempt, y, currentAttempt, notFound, size]);

  useEffect(() => {
      if (board[attempt][y] && !className.includes("exists")) {
        setClassName(c => c + " exists");
      } else if(!board[attempt][y] || board[attempt][y] === null){
        setClassName(c => c.replace(" exists", ""));
      }
  }, [board]);

  useEffect(() => {
    if ((notFound || size) && currentAttempt === attempt) {
      console.log(currentAttempt, attempt)
      setClassName(" exists");

      if(!board[attempt][y] || board[attempt][y] === null){
        setClassName(c => c.replace(" exists", ""));
      }
    }
  }, [notFound, size]);

  return <div className={"Letter " + className}>{board[attempt][y]}</div>;
};

export default Letter;
