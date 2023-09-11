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
  const [enter, setEnter] = useState(false);

  const onEnter = async () => {
    setEnter(true);
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
    if (enter) {
      const func = async () => {
          if (champ.length > 0 || champ.length < answer.length) {
            setSize(true);
            return;
          }

          const all = await fetchChampions();
          if (!all.includes(champ.toLowerCase())) {
            setNotFound(true);
            return;
          }

          //Win
          if (champ === answer) {
            setWin(true);
          }

          //Next Attempt
          if (champ !== answer) {
            setAttempt((a) => a + 1);
            setChamp("");
          }

          //Game Over
          if (board.length > 0 && attempt === board.length) {
            setLose(true);
          }
      };

      func();
    }

    setEnter(false);
  }, [enter]);

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
        setWin,
        setLose,
        setNotFound,
        setSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
