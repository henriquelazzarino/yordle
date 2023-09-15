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
    if (((className.includes("exists") && !className.includes("disabled")) || className.length === 0) &&
        currentAttempt === attempt) {
      if (correctPlace.includes(board[attempt][y])) {
        setClassName("correct");
      } else if (wrongPlace.includes(board[attempt][y])) {
        setClassName("wrong-position");
      } else if (nonExistent.includes(board[attempt][y]) && board[attempt][y] !== null) {
        setClassName("disabled");
      } else if (!className.includes("exists")) {
        setClassName("");
      } 
    } 

    if (board[attempt][y] && !className.includes("exists")) {
      setClassName(c => c + " exists");
    } else if(!board[attempt][y]){
      setClassName(c => c.replace(" exists", ""));
    }
  }, [correctPlace, wrongPlace, nonExistent, board, attempt, y, currentAttempt]);

  useEffect(() => {
    console.log("correct: " + correctPlace.length);
    console.log("wrong: " + wrongPlace.length);
    console.log("non: " + nonExistent.length);
  }, [correctPlace, wrongPlace, nonExistent]);

  return <div className={"Letter " + className}>{board[attempt][y]}</div>;
};

export default Letter;
