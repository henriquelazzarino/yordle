import React, { createContext, useEffect, useState } from "react";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);
  const [board, setBoard] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [champ, setChamp] = useState("");

  const onEnter = async () => {
    if (champ.length < answer.length) alert("Tamanho");
    else if (!(await fetchChampions().then((res) => res.has(champ))))
      alert("Inexistente"); //Talvez de erro
    else if (champ === answer) alert("Ganhou");
    else {
      setAttempt((a) => a + 1);
    }
  };

  const onDelete = () => {};

  const onSelectLetter = () => {};

  const fetchChampions = async () => {
    try {
      const response = await fetch("http://localhost:3000/champions");
      if (!response.ok) {
        throw new Error("Failed to fetch champions data");
      }
      const championsData = await response.json();
      return championsData.map((champion) => champion.name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const getRandomChampion = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      };

      const champions = await fetchChampions();
      const randomChampion = getRandomChampion(champions);
      setAnswer(randomChampion.toUpperCase());
    };

    init();
  }, []);

  return (
    <GameContext.Provider value={{ answer, setAnswer, board, setBoard }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
