import React, { useState } from 'react';
import { useEffect } from 'react';
import Tile from './Tile'

function GameBoard(props) {

  const [shipHover, setShipHover] = useState([])
  const [currentTile, setCurrentTile] = useState(99)

  return (
    <main className="game-board">
      {[...Array(100)].map((e, i) => {
        return <Tile 
                  index={i} 
                  key={i}
                  activeShip={props.activeShip}
                  shipHover={shipHover}
                  setShipHover={setShipHover}
                  currentTile={currentTile}
                  setCurrentTile={setCurrentTile}
                />            
      })}
    </main>
 )
}

export default GameBoard;