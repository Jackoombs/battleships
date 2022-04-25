import React, { useState } from 'react';
import { useEffect } from 'react';
import Tile from './Tile'

function GameBoard(props) {

  const [shipHover, setShipHover] = useState([])
  const [hoverOrientation, setHoverOrientation] = useState(true)
  const [indexOnWheel, setIndexOnWheel] = useState(0)

  useEffect(() => {
    setShipHover([])
  },[props.activeShip])


  return (
    <main className="game-board"
          onWheel={(e) => {
            setHoverOrientation(!hoverOrientation)
    }}
    >
      {[...Array(100)].map((e, i) => {
        return <Tile 
                  index={i} 
                  key={i}
                  activeShip={props.activeShip}
                  isActive={shipHover.includes(i)?true:false}
                  setShipHover={setShipHover}
                  hoverOrientation={hoverOrientation}
                  indexOnWheel={indexOnWheel}
                  setIndexOnWheel={setIndexOnWheel}
                />            
      })}
    </main>
 )
}

export default GameBoard;