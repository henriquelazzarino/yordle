import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

import "./Letter.css"

const Letter = ({ y }) => {
  const { board, setBoard, attempt } = useContext(GameContext); 
  console.log(board[attempt][y])
  return (
    <div className={'Letter'}>
      {board[attempt][y]}
    </div>
  )
}

export default Letter