import React from "react";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyBoard = useCallback((e) => {
    if (e.key === "Enter") {
      onEnter();
    } else if (e.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  return <></>;
};

export default Keyboard;
