import './App.css';
import Nav from './components/Nav'
import GameBoard from './components/GameBoard'
import ShipSelection from './components/ShipSelection';
import { useState } from 'react';

function App() {

  const createShip = (name, color, length) => {
    return{name, color, length, placed:false}
  }

  let ships = [
    createShip('Carrier', 'rgb(255, 89, 94)', 5),
    createShip('Battleship', 'rgb(255, 202, 58)', 4),
    createShip('Cruiser', 'rgb(138, 201, 38)', 3),
    createShip('Submarine','rgb(226, 248, 241)', 3),
    createShip('Destroyer', 'rgb(183, 158, 219)', 2) 
  ]


  const [activeShip, setActiveShip] = useState(ships[0])

  return (
    <div className="App">
      <Nav />
      <ShipSelection 
      activeShip={activeShip}
      setActiveShip={setActiveShip}
      ships={ships}/>
      <GameBoard activeShip={activeShip} />
      <h1>{activeShip.length}</h1>
    </div>
  );
}

export default App;
