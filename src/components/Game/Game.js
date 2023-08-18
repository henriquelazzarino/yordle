import React, { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

import "./Game.css";

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
    <div>
      {board&&board.map((linha, i) =>  (
        <div style={{"background": "black", "height": "100px", "display": "flex"}}>
          {linha.map((letra, j)=>(
            <div style={{"background": "red", "height": "100px", "width": "50px"}}>
              {answer[j]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
