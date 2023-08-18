import React, { createContext, useEffect, useState } from "react";  

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);
  const [board, setBoard] = useState([])

  return (
    <GameContext.Provider value={{ answer, setAnswer, board, setBoard }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;