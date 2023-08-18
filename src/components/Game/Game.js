import React, { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

import "./Game.css";
import Word from "../Word/Word";

const Game = () => {
  const { answer, board, setBoard } = useContext(GameContext);

  useEffect(() => {
    const id = setTimeout(()=>{
    if (board.length===0&&answer) {
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
      
    }
  }, 1000)
  return ()=>clearTimeout(id)
  }, [answer]);

  console.log(board)

  return (
    <div className="Game">
      {board&&board.map((linha, i) =>  (
        <Word size={linha.length} key={i}/>
      ))}
    </div>
  );
};

export default Game;
