import React, { useState } from 'react';
import { useEffect } from 'react';
import Tile from './Tile'

function GameBoard(props) {

  const [selectionPreview, setSelectionPreview] = useState([])
  const [previewOrientation, setPreviewOrientation] = useState(true)
  const [currentTile, setCurrentTile] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validSelection, setValidSelection] = useState([])
  const [validOnHover, setValidOnHover] = useState(true)

  useEffect(() => {
    const result = selectionPreview.filter(element => selectedTiles.includes(element))
    if (result.length) setValidOnHover(false)
    else setValidOnHover(true)
    },[selectionPreview])

  return (
    <main className="game-board"
          onMouseLeave={() => {
            setSelectionPreview([])
          }}
    >
      {[...Array(100)].map((e, i) => {
        return <Tile 
                  key={i}
                  index={i}
                  ships={props.ships}
                  activeShip={props.activeShip}
                  setActiveShip={props.setActiveShip}
                  selectionPreview={selectionPreview}
                  setSelectionPreview={setSelectionPreview}
                  previewOrientation={previewOrientation}
                  setPreviewOrientation={setPreviewOrientation}
                  currentTile={currentTile}
                  setCurrentTile={setCurrentTile}
                  selectedTiles={selectedTiles}
                  setSelectedTiles={setSelectedTiles}
                  validSelection={validSelection}
                  setValidSelection={setValidSelection}
                  changeShipToSelected={props.changeShipToSelected}
                  validOnHover={validOnHover}
                />            
      })}
    </main>
 )
}

export default GameBoard;