import React from "react";
import ShipSelection from "./ShipSelection";
import ShipStatus from "./ShipStatus";

function ShipPanel(props) {

return (
  <aside className="ship-panel">

    {!props.battleActive
      ?<ShipSelection 
        activeShip={props.activeShip}
        setActiveShip={props.setActiveShip}
        ships={props.ships}
        changeShipSelectedStatus={props.changeShipSelectedStatus}
      />
      :<ShipStatus 
        playerShips={props.playerShips}
        computerShips={props.computerShips}
        activeShip={props.activeShip}
        battleActive={props.battleActive}
      />
    } 
  </aside>
)
}

export default ShipPanel