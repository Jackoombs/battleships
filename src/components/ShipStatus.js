import React from "react";
import Ship from "./Ship";

function ShipStatus(props) {

  const tileSizeMultiplier = 0.6

  return (
    <div className="ship-status">
      <div className="status-container">
        <h3>Your Ships</h3>
        <div className="ships">
          {props.playerShips.map((ship, i) =>
            <Ship 
              key={i}
              id={i}
              ship={ship}
              activeShip={props.activeShip}
              tileSizeMultiplier={tileSizeMultiplier}
              battleActive={props.battleActive}
            />
          )}
        </div>
      </div>
      <div className="status-container">
        <h3>Computer's Ships</h3>
        <div className="ships">
          {props.computerShips.map((ship, i) =>
            <Ship
              key={i}
              id={i}
              ship={ship}
              activeShip={props.activeShip}
              tileSizeMultiplier={tileSizeMultiplier}
              battleActive={props.battleActive}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShipStatus