import React, { useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";

const Game = () => {
  const {answer} = useContext(GameContext)

  return <div>{answer}</div>;
};

export default Game;
