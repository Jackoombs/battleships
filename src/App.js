import './App.css';
import Nav from './components/Nav'
import GameBoard from './components/GameBoard'
import ShipSelection from './components/ShipSelection';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const createShip = (name, color, length) => {
    return{name, color, length, placed:false}
  }

  const [ships, setShips] = useState([
    createShip('Carrier', 'rgb(255, 89, 94)', 5),
    createShip('Battleship', 'rgb(255, 202, 58)', 4),
    createShip('Cruiser', 'rgb(138, 201, 38)', 3),
    createShip('Submarine','rgb(226, 248, 241)', 3),
    createShip('Destroyer', 'rgb(183, 158, 219)', 2) 
  ])

  const [activeShip, setActiveShip] = useState(ships[0])

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
    console.log(updatedShip,index)
    setShips(newArray)
  }

  useEffect(() => {
    console.log(activeShip)
  },[activeShip])

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
      />
    </div>
  );
}

export default App;
