import React, { useContext, useEffect } from "react";

import { GameContext } from "../../context/GameContext";

import "./Keyboard.css";
import Key from "../Key/Key";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const { onEnter, onSelectLetter, onDelete, disabledLetters, wrongPosLetters, correctLetters } = useContext(GameContext);

  const handleKeyBoard = (e) => {
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
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);
    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, []);

  return (
    <div className="Keyboard">
      <div className="Keyboard__row">
        {keys1.map((key) => (
          <Key
            key={key}
            letter={key}
            disabled={disabledLetters.includes(key)}
            wrongPosition={wrongPosLetters.includes(key)}
            correct={correctLetters.includes(key)}
          />
        ))}
      </div>
      <div className="Keyboard__row">
        {keys2.map((key) => (
          <Key
            key={key}
            letter={key}
            disabled={disabledLetters.includes(key)}
            wrongPosition={wrongPosLetters.includes(key)}
            correct={correctLetters.includes(key)}
          />
        ))}
      </div>
      <div className="Keyboard__row">
        <Key
          letter="ENTER"
          />
        {keys3.map((key) => (
          <Key
            key={key}
            letter={key}
            disabled={disabledLetters.includes(key)}
            wrongPosition={wrongPosLetters.includes(key)}
            correct={correctLetters.includes(key)}
          />
        ))}
        <Key
          letter="DELETE"
          />
      </div>
    </div>
  );
};

export default Keyboard;
