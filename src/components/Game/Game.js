import React, { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

import "./Game.css";
import Word from "../Word/Word";

const Game = () => {
  const { answer, board, setBoard } = useContext(GameContext);

  useEffect(() => {
    if (answer) {
      const createInitialBoard = () => {
        const rows = 5;
        const columns = answer.length;
        const initialBoard = Array.from({ length: rows }, () =>
        Array(columns).fill(null)
        );
        return initialBoard;
      };
      
      setBoard(createInitialBoard());
    }
  }, [answer]);

  return (
    <div className="Game">
      {board&&board.map((linha, i) =>  (
        <Word size={linha.length} key={i} attempt={i}/>
      ))}
    </div>
  );
};

export default Game;
