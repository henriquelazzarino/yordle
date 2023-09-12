import React, { useContext, useEffect, useState } from 'react'

import './Key.css'
import { GameContext } from '../../context/GameContext';

const Key = ({ letter, disabled, wrongPosition, correct }) => {
  const [className, setClassName] = useState("");
  const { onSelectLetter, onEnter, onDelete } = useContext(GameContext);

  useEffect(() => {
    setClassName(() => {
      let className = "Key";
      if (correct) {
        className += " correct";
      }else if (wrongPosition) {
        className += " wrong-position";
      }else if (disabled) {
        className += " disabled";
      }
      return className;
    });
  }, [disabled, wrongPosition, correct]);

  const selectLetter = () => {
    if (letter === "ENTER") {
      onEnter();
    } else if (letter === "DELETE") {
      onDelete();
    } else{
      onSelectLetter(letter);
    }
  };

  return (
    <div className={className} onClick={selectLetter}>
      {letter}
    </div>
  )
}

export default Key