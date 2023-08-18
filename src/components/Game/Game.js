import React, { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

import "./Game.css";

const Game = () => {
  const { answer, board, setBoard } = useContext(GameContext);

  useEffect(() => {
    if (answer) {
      const createInitialBoard = () => {
        const rows = 6;
        const columns = answer.length;
        const initialBoard = Array.from({ length: rows }, () =>
          Array(columns).fill(null)
        );
        return initialBoard;
      };

      setBoard(createInitialBoard());
      console.log(answer)
      console.log(answer)
      console.log(board)
    }
  }, [answer]);

  return <div></div>;
};

export default Game;
