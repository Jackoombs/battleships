import React, { useState } from 'react';
import Tile from './Tile'

function GameBoard(props) {

  const [shipHover, setShipHover] = useState([])
  const [hoverOrientation, setHoverOrientation] = useState(true)

  console.log(hoverOrientation)

  return (
    <main className="game-board"
          onWheel={() => {
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
                />            
      })}
    </main>
 )
}

export default GameBoard;