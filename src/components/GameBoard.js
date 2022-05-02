import React, { useState } from 'react';
import { useEffect } from 'react';
import Tile from './Tile'

function GameBoard(props) {

  const [selectionPreview, setSelectionPreview] = useState([])
  const [previewOrientation, setPreviewOrientation] = useState(true)
  const [currentTile, setCurrentTile] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validSelection, setValidSelection] = useState([])

  useEffect(() => {
    
  },[props.activeShip])

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
                  activeShip={props.activeShip}
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
                />            
      })}
    </main>
 )
}

export default GameBoard;