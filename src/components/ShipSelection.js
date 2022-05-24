import React from "react";
import Ship  from "./Ship";

function ShipSelection(props) {

  const activeShipClickHandler = (id) => {
    const selectedShip = props.ships[id]
    if (selectedShip.placed) {
      props.changeShipSelectedStatus(selectedShip, false)
    } 
    props.setActiveShip(selectedShip)
  }

return (
  <aside className="ship-selection">
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
  </aside>
)
}

export default ShipSelection