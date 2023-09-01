import React, { useCallback, useContext, useEffect } from "react";

import { GameContext } from "../../context/GameContext";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const { onEnter, onSelectLetter, onDelete } = useContext(GameContext);

  const handleKeyBoard = useCallback((e) => {
    if (e.key === "Enter") {
      onEnter();
    } else if (e.key === "Backspace") {
      onDelete();
    } else {
      const keyPressed = e.key.toUpperCase();

      if (
        keys1.includes(keyPressed) ||
        keys2.includes(keyPressed) ||
        keys3.includes(keyPressed)
      ) {
        onSelectLetter(keyPressed);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyBoard);
    return () => {
      document.removeEventListener("keypress ", handleKeyBoard);
    };
  }, [handleKeyBoard]);

  return <></>;
};

export default Keyboard;
