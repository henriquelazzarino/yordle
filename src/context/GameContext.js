import React, { createContext, useEffect, useState } from "react";
import champions from "../data/champions.txt"

// Exportando o GameContext como export nomeado
export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);

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
        const response = await fetch(champions);
        if (!response.ok) {
          throw new Error("Failed to fetch champions data");
        }
        const championsData = await response.text();
        const championsArray = championsData.split(/\r?\n/);
        const randomChampion = getRandomChampion(championsArray);
        setAnswer(removeSpecialCharsAndSpaces(randomChampion).toUpperCase());
      } catch (error) {
        console.error(error);
      }
    };

    fetchChampions();
  }, []);

  return (
    <GameContext.Provider value={{ answer, setAnswer }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;