import './App.css';
import Nav from './components/Nav'
import GameBoard from './components/GameBoard'
import ShipPanel from './components/ShipPanel';
import { useState } from 'react';
import { useEffect } from 'react';
import GameInfo from './components/GameInfo';
import generateShips from './utils/generateShips';
import ResultModal from './components/ResultModal';

function App() {

  const createShip = (name, color, length) => {
    return{name, color, length, placed:false}
  }

  const createPlayerShip = (name, color, length) => {
    return{name, color, length, tileIndexs: [], sunk: false}
  }

  const [ships, setShips] = useState([
    createShip('Carrier', 'rgb(255, 89, 94)', 5),
    createShip('Battleship', 'rgb(255, 202, 58)', 4),
    createShip('Cruiser', 'rgb(138, 201, 38)', 3),
    createShip('Submarine','rgb(226, 248, 241)', 3),
    createShip('Destroyer', 'rgb(183, 158, 219)', 2) 
  ])

  const [hitMissStatus, setHitMissStatus] = useState(false)
  const [endPlanningPhase, setEndPlanningPhase] = useState(false)
  const [battleActive, setBattleActive] = useState(false)
  const [playerTurn, setPlayerTurn] = useState(true)
  const [activeShip, setActiveShip] = useState(ships[0])
  const [computerShips, setComputerShips] = useState([])
  const [playerShips, setPlayerShips] = useState([
    createPlayerShip('Carrier', 'rgb(255, 89, 94)', 5),
    createPlayerShip('Battleship', 'rgb(255, 202, 58)', 4),
    createPlayerShip('Cruiser', 'rgb(138, 201, 38)', 3),
    createPlayerShip('Submarine','rgb(226, 248, 241)', 3),
    createPlayerShip('Destroyer', 'rgb(183, 158, 219)', 2) 
  ])
  const [isWinner, setIsWinner] = useState(false)
  
  useEffect(() => {
    setComputerShips(generateShips)
  },[battleActive])

  useEffect(() => {
    console.log(computerShips, playerShips)
  },[computerShips, playerShips])

  useEffect(() => {
    const shipsNotPlaced = ships.filter(ship => ship.placed === false)
    if (shipsNotPlaced.length) setActiveShip(shipsNotPlaced[0])
    else setActiveShip({name:false, selected:true})
  },[ships])

  const changeShipSelectedStatus = (ship, isPlaced) => {
    const updatedShip = ship
    updatedShip.placed = isPlaced
    const index = ships.findIndex(arrayShip => arrayShip.name === ship.name)
    const newArray = [...ships]
    newArray[index] = updatedShip
    setShips(newArray)
  }

  const resetGame = () => {
    setShips([
      createShip('Carrier', 'rgb(255, 89, 94)', 5),
      createShip('Battleship', 'rgb(255, 202, 58)', 4),
      createShip('Cruiser', 'rgb(138, 201, 38)', 3),
      createShip('Submarine','rgb(226, 248, 241)', 3),
      createShip('Destroyer', 'rgb(183, 158, 219)', 2) 
    ])
    setPlayerShips([
      createPlayerShip('Carrier', 'rgb(255, 89, 94)', 5),
      createPlayerShip('Battleship', 'rgb(255, 202, 58)', 4),
      createPlayerShip('Cruiser', 'rgb(138, 201, 38)', 3),
      createPlayerShip('Submarine','rgb(226, 248, 241)', 3),
      createPlayerShip('Destroyer', 'rgb(183, 158, 219)', 2) 
    ])
    setHitMissStatus(false)
    setEndPlanningPhase(false)
    setBattleActive(false)
    setPlayerTurn(true)
    setActiveShip(ships[0])
    setComputerShips([])
    setIsWinner(false)
  }

  return (
    <div className="App">
      <Nav />
      <section className='content'>
        <GameInfo
          ships={ships}
          setEndPlanningPhase={setEndPlanningPhase}
          battleActive={battleActive}
          setBattleActive={setBattleActive}
          playerTurn={playerTurn}
          hitMissStatus={hitMissStatus}
        />
        
        <GameBoard 
          ships={ships}
          activeShip={activeShip}
          setActiveShip={setActiveShip}
          changeShipSelectedStatus={changeShipSelectedStatus}
          battleActive={battleActive}
          setBattleActive={setBattleActive}
          playerShips={playerShips}
          setPlayerShips={setPlayerShips}
          computerShips={computerShips}
          setComputerShips={setComputerShips}
          isWinner={isWinner}
          setIsWinner={setIsWinner}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
          endPlanningPhase={endPlanningPhase}
          setHitMissStatus={setHitMissStatus}
        />
        
        <ShipPanel 
          battleActive={battleActive}
          activeShip={activeShip}
          setActiveShip={setActiveShip}
          ships={ships}
          changeShipSelectedStatus={changeShipSelectedStatus}
          playerShips={playerShips}
          computerShips={computerShips}
        />
      </section>  

      {isWinner?
      <ResultModal 
        playerTurn={playerTurn}
        resetGame={resetGame}
        isWinner={isWinner}
      />:''}

    </div>
  );
}

export default App;
