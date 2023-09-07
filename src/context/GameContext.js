import React, { createContext, useEffect, useState } from "react";
import championsTxt from "../data/champions.txt";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);
  const [board, setBoard] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [champ, setChamp] = useState(String(""));

  const onEnter = async () => {
    if (champ.length < answer.length) alert("Tamanho");
    else if (!(await fetchChampions().then((res) => res.has(champ))))
      alert("Inexistente"); //Talvez de erro
    else if (champ === answer) alert("Ganhou");
    else {
      setAttempt((a) => a + 1);
    }
  };

  const onSelectLetter = (letter) => {
    setChamp((c) => c + letter);
  };

  useEffect(() => {
    if (board && board[attempt]) {
      setBoard((b) => {
        const newBoard = [...b];
        const row = newBoard[attempt];
        for (let i = 0; i < row.length; i++) {
          if (row[i] === null) {
            if (i < champ.length) {
              row[i] = champ[i];
            }
            return newBoard;
          }
        }
        return newBoard;
      });
      if (champ.length > board[attempt].length) {
        setChamp(board[attempt].join(""));
      }
    }

    console.log(champ)
  }, [champ]);

  const onDelete = () => {};

  const fetchChampions = async () => {
    try {
      const response = await fetch(championsTxt);
      if (!response.ok) {
        throw new Error("Failed to fetch champions data");
      }
      let champions = [];
      await response.text().then((res) => {
        const championsArray = res.split("\n");
        for (let i = 0; i < championsArray.length; i++) {
          champions.push(championsArray[i].replace("\r", ""));
        }
        return champions;
      });
      return champions;
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

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  return (
    <GameContext.Provider
      value={{
        answer,
        setAnswer,
        board,
        setBoard,
        attempt,
        onEnter,
        onDelete,
        onSelectLetter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
