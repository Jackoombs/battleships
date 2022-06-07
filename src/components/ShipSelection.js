import React from "react";
import Ship from "./Ship";

function ShipSelection(props) {

  const activeShipClickHandler = (id) => {
    const selectedShip = props.ships[id]
    if (selectedShip.placed) {
      props.changeShipSelectedStatus(selectedShip, false)
    } 
    props.setActiveShip(selectedShip)
  }

  return (
    <div className="ship-selection">
      {props.ships.map((ship, i) => (
        <Ship 
          key={i}
          id={i}
          ship={ship}
          activeShip={props.activeShip} 
          activeShipClickHandler={activeShipClickHandler}
          showName={true}
          battleActive={props.battleActive}/>

      ))}
    </div>
  )
}

export default ShipSelection