import React, { createContext, useEffect, useState } from "react";
import championsTxt from "../data/champions.txt";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState("");
  const [board, setBoard] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [champ, setChamp] = useState("");
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);
  const [size, setSize] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const onEnter = async () => {
    if (champ.length < answer.length) {
      setSize(true);
      return;
    }

    const all = await fetchChampions();

    console.log(!all.includes(champ))
    console.log(champ)

    if (!all.includes(champ)) {
      setNotFound(true);
      return;
    }

    console.log(champ, board, answer);

    //Win
    if (champ === answer) {
      console.log("win");
      setWin(true);
    }

    //Game Over
    if (board.length > 0 && attempt === board.length) {
      setLose(true);
    }
    setAttempt((a) => a + 1);
    setChamp(String(""));
  };

  const onSelectLetter = (letter) => {
    setChamp((c) => c + letter);
  };

  const onDelete = () => {
    setChamp((c) => c.slice(0, -1));
  };

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
    if (!win) {
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
            } else {
              row[i] = champ[i];
            }
          }
          return newBoard;
        });
        if (champ.length > board[attempt].length) {
          setChamp(board[attempt].join(""));
        }
      }
    }
  }, [champ]);

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

  useEffect(() => {
    console.log(board);
  }, [board]);

  useEffect(() => {
    console.log(champ);
  }, [champ]);

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
        win,
        lose,
        size,
        notFound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}; 

export default GameContextProvider;
