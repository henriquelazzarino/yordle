import React from 'react'

import "./Word.css"
import Letter from '../Letter/Letter'

const Word = ({ size }) => {
  const lettersArray = Array.from({ length: size }, (_, index) => index);
  console.log(lettersArray)
  return (
    <div className='word'>
      {lettersArray.map((i)=>(
        <Letter key={i} y={i}/>
      ))}
    </div>
  )
}

export default Word