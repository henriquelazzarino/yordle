import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

import "./Letter.css"

const Letter = ({ x, y }) => {
  const { board, setBoard } = useContext(GameContext);
  return (
    <div className='Letter'>
      {null}
    </div>
  )
}

export default Letter