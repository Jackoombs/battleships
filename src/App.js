import './App.css';
import Nav from './components/Nav'
import GameBoard from './components/GameBoard'
import ShipSelection from './components/ShipSelection';
import { useState } from 'react';
import { useEffect } from 'react';
import Controls from './components/Controls';
import generateShips from './utils/generateShips';

function App() {

  const createShip = (name, color, length) => {
    return{name, color, length, placed:false}
  }

  const createplayerShip = (name, length) => {
    return{name, length, tileIndexs: []}
  }

  const [ships, setShips] = useState([
    createShip('Carrier', 'rgb(255, 89, 94)', 5),
    createShip('Battleship', 'rgb(255, 202, 58)', 4),
    createShip('Cruiser', 'rgb(138, 201, 38)', 3),
    createShip('Submarine','rgb(226, 248, 241)', 3),
    createShip('Destroyer', 'rgb(183, 158, 219)', 2) 
  ])

  const[battleActive, setBattleActive] = useState(false)
  const [playerTurn, setPlayerTurn] = useState(true)
  const [activeShip, setActiveShip] = useState(ships[0])
  const [computerShips, setComputerShips] = useState()
  const [playerShips, setPlayerShips] = useState([
    createplayerShip('Carrier', 5),
    createplayerShip('Battleship', 4),
    createplayerShip('Cruiser', 3),
    createplayerShip('Submarine', 3),
    createplayerShip('Destroyer', 2) 
  ])
  const [isWinner, setIsWinner] = useState()
  
  useEffect(() => {
    setComputerShips(generateShips)
  },[battleActive])

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

  return (
    <div className="App">
      <Nav />
      <ShipSelection 
        activeShip={activeShip}
        setActiveShip={setActiveShip}
        ships={ships}

        changeShipSelectedStatus={changeShipSelectedStatus}
      />
      <GameBoard 
        ships={ships}
        activeShip={activeShip}
        setActiveShip={setActiveShip}
        changeShipSelectedStatus={changeShipSelectedStatus}
        battleActive={battleActive}
        playerShips={playerShips}
        setPlayerShips={setPlayerShips}
        computerShips={computerShips}
        setComputerShips={setComputerShips}
        setIsWinner={setIsWinner}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
      />
      <Controls
        ships={ships}
        battleActive={battleActive}
        setBattleActive={setBattleActive}
      />
    </div>
  );
}

export default App;
