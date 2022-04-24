import React from "react";
import Ship  from "./Ship";

function ShipSelection(props) {

return (
  <div className="ship-selection">
    <Ship name="Carrier" color="rgb(255, 89, 94)" activeShipClickHandler={props.activeShipClickHandler}  length="5" activeShip={props.activeShip}/>
    <Ship name="Battleship" color="rgb(255, 202, 58)" activeShipClickHandler={props.activeShipClickHandler} length="4" activeShip={props.activeShip}/>
    <Ship name="Cruiser" color="rgb(138, 201, 38)" activeShipClickHandler={props.activeShipClickHandler} length="3" activeShip={props.activeShip}/>
    <Ship name="Submarine" color="rgb(226, 248, 241)" activeShipClickHandler={props.activeShipClickHandler} length="3" activeShip={props.activeShip}/>
    <Ship name="Destroyer" color="rgb(183, 158, 219)" activeShipClickHandler={props.activeShipClickHandler} length="2" activeShip={props.activeShip}/>
  </div>
)
}

export default ShipSelection