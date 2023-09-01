import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

import "./Letter.css"

const Letter = ({ y, attempt }) => {
  const { board } = useContext(GameContext);
  return (
    <div className={'Letter'}>
      {board[attempt][y]}
    </div>
  )
}

export default Letter