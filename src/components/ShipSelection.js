import React from "react";
import Ship  from "./Ship";

function ShipSelection(props) {

  const activeShipClickHandler = (id) => {
    props.setActiveShip(props.ships[id])
  }

return (
  <div className="ship-selection">
    {props.ships.map((ship, i) => (
      <Ship 
      key={i}
      id={i}
      name={ship.name} 
      color={ship.color} 
      length={ship.length} 
      placed={ship.placed}
      activeShip={props.activeShip} 
      activeShipClickHandler={activeShipClickHandler}/>
    ))}
  </div>
)
}

export default ShipSelection