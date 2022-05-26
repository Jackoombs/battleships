import React, { useState } from 'react';
import { useEffect } from 'react';
import SelectionPhaseTile from './SelectonPhaseTile';
import ComputerBattleTile from './ComputerBattleTile';

function GameBoard(props) {

  const [selectionPreview, setSelectionPreview] = useState([])
  const [previewOrientation, setPreviewOrientation] = useState(true)
  const [currentTile, setCurrentTile] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validSelection, setValidSelection] = useState([])
  const [validOnHover, setValidOnHover] = useState(true)

  const [userHit, setUserHit] = useState([])
  const [userMissed, setUserMissed] = useState([])
  const [computerHit, setComputerHit] = useState([])
  const [computerMissed, setComputerMissed] = useState([])

  useEffect(() => {
    const result = selectionPreview.filter(element => selectedTiles.includes(element))
    if (result.length) setValidOnHover(false)
    else setValidOnHover(true)
    },[selectionPreview]
  )

  useEffect(() => {
    setSelectedTiles([])
    setCurrentTile(0)
  },[props.battleActive])

  const checkWin = () => {
    if (computerHit.length === 17) setIsWinner('player')
    if (userHit.length === 17) setIsWinner('player')
  }

  return (
    <main id="gameboard"
          onMouseLeave={() => {
            setSelectionPreview([])
            setCurrentTile()
          }}
    >
      
      {!props.battleActive?
      [...Array(100)].map((e, i) => {
        return (
          <SelectionPhaseTile 
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
            changeShipSelectedStatus={props.changeShipSelectedStatus}
            validOnHover={validOnHover}
            userShips={props.userShips}
            setUserShips={props.setUserShips}
            battleActive={props.battleActive}
          /> 
        )           
      }):
      [...Array(100)].map((e, i) => {
        return (
          <ComputerBattleTile 
            key={i}
            index={i}
            computerHit={computerHit}
            setComputerHit={setComputerHit}
            computerMissed={computerMissed}
            setComputerMissed={setComputerMissed}
            computerShips={props.computerShips}
            setComputerShips={props.setComputerShips}
          />
      )
      })
      
      
      }
    </main>
 )
}

export default GameBoard;