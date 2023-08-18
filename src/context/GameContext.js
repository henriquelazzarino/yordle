import React, { createContext, useEffect, useState } from "react";  

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);
  const [board, setBoard] = useState([])

  useEffect(() => {
      const getRandomChampion = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      };
      
      const removeSpecialCharsAndSpaces = (str) => {
        return str.replace(/[^a-zA-Z]/g, "").toLowerCase();
      };
      
      const fetchChampions = async () => {
          try {
            const response = await fetch("http://localhost:3000/champions");
            if (!response.ok) {
              throw new Error("Failed to fetch champions data");
            }
            const championsData = await response.json();
            const championsArray = championsData.map(champion => champion.name);
            const randomChampion = getRandomChampion(championsArray);
            setAnswer(removeSpecialCharsAndSpaces(randomChampion).toUpperCase());
          } catch (error) {
            console.error(error);
          }
      };
      
      fetchChampions();
  }, []);

  return (
    <GameContext.Provider value={{ answer, setAnswer, board, setBoard }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;