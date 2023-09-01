import React from 'react'

import "./Word.css"
import Letter from '../Letter/Letter'

const Word = ({ size, attempt }) => {
  const lettersArray = Array.from({ length: size }, (_, index) => index);
  return (
    <div className='word'>
      {lettersArray.map((index) => (
        <Letter key={index} y={index} attempt={attempt} />
      ))}
    </div>
  )
}

export default Word