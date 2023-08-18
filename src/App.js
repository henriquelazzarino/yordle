import { useContext, useEffect, useState } from "react";
import Game from "./components/Game/Game";
import { GameContext } from "./context/GameContext";
function App() {
  const { answer, setAnswer } = useContext(GameContext);
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
        if (!answer) {
          setAnswer(removeSpecialCharsAndSpaces(randomChampion).toUpperCase());
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!answer) {
      fetchChampions();
    }
  }, [answer]);

  return <div className="App">
    <Game />
  </div>;
}

export default App;
