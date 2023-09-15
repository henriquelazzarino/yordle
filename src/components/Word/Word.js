import React, { useContext, useEffect, useState } from 'react'

import "./Word.css"
import Letter from '../Letter/Letter'
import { GameContext } from '../../context/GameContext';

const Word = ({ size, attempt }) => {
  const lettersArray = Array.from({ length: size }, (_, index) => index);
  const { board, answer, enter, notFound, size: sz, setNotFound, setSize } = useContext(GameContext);

  const [correctLettersInPlace, setCorrectLettersInPlace] = useState([]);
  const [correctLettersOutOfPlace, setCorrectLettersOutOfPlace] = useState([]);
  const [nonExistentLetters, setNonExistentLetters] = useState([]);

  useEffect(() => {
    if (notFound || sz){
      setCorrectLettersInPlace([]);
      setCorrectLettersOutOfPlace([]);
      setNonExistentLetters([]);
      return
    }

    if (answer && board[attempt]) {
      if (enter) { 
        const answerLetters = answer.split("");
        const actualLetters = board[attempt];
          
        const correctInPlace = [];
        const correctOutOfPlace = [];
        const nonExistent = [];

        
        
        for (let i = 0; i < actualLetters.length; i++) {
          const actualLetter = actualLetters[i];
          const answerLetter = answerLetters[i];
          
          if (actualLetter === answerLetter) {
            correctInPlace.push(actualLetter);
          } else if (answerLetters.includes(actualLetter)) {
            correctOutOfPlace.push(actualLetter);
          } else if (!answerLetters.includes(actualLetter)){
            nonExistent.push(actualLetter);
          }
        }
        
        setCorrectLettersInPlace([...correctInPlace]);
        setCorrectLettersOutOfPlace([...correctOutOfPlace]);
        setNonExistentLetters([...nonExistent]);
      }
    }
  
  }, [answer, board, enter, notFound, sz, attempt]);

  return (
    <div className='word'>
      {lettersArray.map((index) => (
        <Letter key={index} 
          y={index} 
          attempt={attempt} 
          correctPlace={correctLettersInPlace}
          wrongPlace={correctLettersOutOfPlace}
          nonExistent={nonExistentLetters}
        />
      ))}
    </div>
  )
}

export default Word