import './App.css';
import Nav from './components/Nav'
import GameBoard from './components/GameBoard'
import ShipSelection from './components/ShipSelection';
import { useState } from 'react';

function App() {

  const [activeShip, setActiveShip] = useState({
                                        ship: 'Carrier', 
                                        color: 'rgb(255, 89, 94)',
                                        length: '5'}
  )

  const activeShipClickHandler = (e) => {
    console.log(e.currentTarget)
    setActiveShip({
      ship: e.currentTarget.textContent,
      color:e.currentTarget.style.getPropertyValue('background-color'),
      length: e.currentTarget.getAttribute('data-length')
    })
  }

  return (
    <div className="App">
      <Nav />
      <ShipSelection activeShipClickHandler={activeShipClickHandler} activeShip={activeShip}/>
      <GameBoard activeShip={activeShip} />
      <h1>{activeShip.length}</h1>
    </div>
  );
}

export default App;
