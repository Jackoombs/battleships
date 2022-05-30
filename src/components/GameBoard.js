import React, { useState } from 'react';
import { useEffect } from 'react';
import SelectionPhaseTile from './SelectionPhaseTile';
import ComputerBattleTile from './ComputerBattleTile';
import PlayerBattleTile from './PlayerBattleTile';
import computerAI from '../utils/computerAI';
import MobileTools from './MobileTools';

function GameBoard(props) {

  const [selectionPreview, setSelectionPreview] = useState([])
  const [previewOrientation, setPreviewOrientation] = useState(true)
  const [currentTile, setCurrentTile] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validSelection, setValidSelection] = useState([])
  const [validOnHover, setValidOnHover] = useState(true)

  const [currentTargets, setCurrentTargets] = useState([])
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
    console.log(currentTile)
  },[currentTile])

  useEffect(() => {
    setSelectedTiles([])
    setCurrentTile(0)
    resetBoard()
  },[props.battleActive])

  useEffect(() => {
    if (props.battleActive) {
    
      if (!props.playerTurn) {
        setTimeout(() => {
          computerTurn()
        }, 2000);
      }
    }
  },[props.playerTurn])

  useEffect(() => {
    checkShipSunk()
    checkWin()
  },[playerHit,computerHit])

  const onTouchMoveHandler = (e) => {
    const xCoord = e.targetTouches[0].clientX
    const yCoord = e.targetTouches[0].clientY
    const elements = document.elementsFromPoint(xCoord, yCoord)
    if (elements[0].classList.contains('tile')) {
      setCurrentTile(+elements[0].id)
    }
  }

  const checkWin = () => {
    if (computerHit.length === 17) {
      props.setIsWinner('player')
    }
    if (playerHit.length === 17) {
      props.setIsWinner('computer')
    }
  }

  const randomTarget = () => {
    let index = null 
    while (index===null || playerHit.includes(index) || playerMissed.includes(index)) {
      index = Math.floor(Math.random() * (100));
    }
    return index
  }

  const computerTarget = () => {
    const excludeArray = playerHit.concat(playerMissed)
    return !currentTargets.length?
      randomTarget():
      computerAI(currentTargets, excludeArray)
  }

  const checkHit = (index, ships) => {
    for (const ship of ships) {
      if (ship.tileIndexs.includes(index)) return true
    }
  }

  const updateHitMissStatus = (isHit) => {
    if (isHit === 'reset') return props.setHitMissStatus(false)
    if (isHit) props.setHitMissStatus("hit")
    else props.setHitMissStatus("miss")
  }

  const checkShipSunk = () => {
    for (const ship of props.playerShips){
      const hits = playerHit.filter(index => ship.tileIndexs.includes(index))
      if (hits.length === ship.length && !ship.sunk) {
        setCurrentTargets([])
        const newShips = [...props.playerShips]
        const shipIndex = newShips.findIndex(item => item.name === ship.name)
        newShips[shipIndex].sunk = true
        props.setPlayerShips(newShips)
      }
    }
  }

  const computerTurn = () => {
    const target = computerTarget()
    const isHit = checkHit(target, props.playerShips)
    updateHitMissStatus(isHit)

    if (isHit) {
      setPlayerHit(oldArray => [...oldArray, target]);
      setCurrentTargets(oldArray => [...oldArray, target])
    }
    else setPlayerMissed(oldArray => [...oldArray, target]);

    setTimeout(() => {
      props.setPlayerTurn(playerTurn => !playerTurn)
      updateHitMissStatus('reset')
    }, 2000);
  }

  const resetBoard = () => {
    setCurrentTargets([])
    setDisableClick(false)
    setPlayerHit([])
    setPlayerMissed([])
    setComputerHit([])
    setComputerMissed([])
  }

  return (
    <main>
      <div id="gameboard"
        onMouseLeave={() => {
          setSelectionPreview([])
        }}
        onTouchMove={onTouchMoveHandler}>

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
              updateHitMissStatus={updateHitMissStatus}
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
      </div>
      <MobileTools 
        setPreviewOrientation={setPreviewOrientation}
      />
    </main>
 )
}

export default GameBoard;