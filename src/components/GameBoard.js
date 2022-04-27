import React, { useState } from 'react';
import Tile from './Tile'

function GameBoard(props) {

  const [shipHover, setShipHover] = useState([])
  const [hoverOrientation, setHoverOrientation] = useState(true)
  const [indexOnWheel, setIndexOnWheel] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validTiles, setValidTiles] = useState([])

  const onClickValidCheck = () => {
    const validArray = shipHover.filter(element => selectedTiles.includes(element))
    if (!validArray.length) {
      setSelectedTiles(oldArray => oldArray.concat(shipHover))
      setValidTiles(shipHover)
    }
  }

  return (
    <main className="game-board"
          // set the hover direction on wheel
          onWheel={() => {setHoverOrientation(!hoverOrientation)}}
          // remove ship on board when mouse leaves gameboard
          onMouseLeave={() => {
            setShipHover([])
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
                  onClickValidCheck={onClickValidCheck}
                  isValid={validTiles.includes(i)?true:false}
                />            
      })}
    </main>
 )
}

export default GameBoard;