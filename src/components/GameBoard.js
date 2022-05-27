import React, { useState } from 'react';
import { useEffect } from 'react';
import SelectionPhaseTile from './SelectionPhaseTile';
import ComputerBattleTile from './ComputerBattleTile';
import PlayerBattleTile from './PlayerBattleTile';

function GameBoard(props) {

  const [selectionPreview, setSelectionPreview] = useState([])
  const [previewOrientation, setPreviewOrientation] = useState(true)
  const [currentTile, setCurrentTile] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validSelection, setValidSelection] = useState([])
  const [validOnHover, setValidOnHover] = useState(true)

  const [disableClick, setDisableClick] = useState(false)
  const [playerHit, setPlayerHit] = useState([])
  const [playerMissed, setPlayerMissed] = useState([])
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

  useEffect(() => {
    checkWin()
      if (!props.playerTurn) {
        setTimeout(() => {
          computerTurn()
        }, 2000);
      }
  },[props.playerTurn])

  const checkWin = () => {
    if (computerHit.length === 17) props.setIsWinner('player')
    if (playerHit.length === 17) props.setIsWinner('player')
  }

  const computerTarget = () => {
    let index = null 
    while (index===null || playerHit.includes(index) || playerMissed.includes(index)) {
      index = Math.floor(Math.random() * (100));
    }
    return index
  }

  const checkHit = (index, ships) => {
    for (const ship of ships) {
      if (ship.tileIndexs.includes(index)) return true
    }
  }

  const computerTurn = () => {
    const target = computerTarget()
    const isHit = checkHit(target, props.playerShips)
    if (isHit) setPlayerHit(oldArray => [...oldArray, target]);
    else setPlayerMissed(oldArray => [...oldArray, target]);
    setTimeout(() => {
      props.setPlayerTurn(playerTurn => !playerTurn)
    }, 2000);
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
            playerShips={props.playerShips}
            setPlayerShips={props.setPlayerShips}
            battleActive={props.battleActive}
            setBattleActive={props.setBattleActive}
            endPlanningPhase={props.endPlanningPhase}
          /> 
        )           
      }):props.playerTurn?
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
            setPlayerTurn={props.setPlayerTurn}
            disableClick={disableClick}
            setDisableClick={setDisableClick}
          />
      )
      }):
      [...Array(100)].map((e, i) => {
        return (
          <PlayerBattleTile 
            key={i}
            index={i}
            playerHit={playerHit}
            setPlayerHit={setPlayerHit}
            playerMissed={playerMissed}
            setPlayerMissed={setPlayerMissed}
            playerShips={props.playerShips}
            setPlayerShips={props.setPlayerShips}
            setPlayerTurn={props.setPlayerTurn}
          />
      )
      })
      
      }
    </main>
 )
}

export default GameBoard;