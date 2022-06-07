import React from "react";

function Ship(props) {
  
  const styles = {
    width: `calc(var(--tile-size) * ${props.ship.length} * ${props.tileSizeMultiplier?props.tileSizeMultiplier:1})`,
    height: `calc(var(--tile-size) * ${props.tileSizeMultiplier?props.tileSizeMultiplier:1})`,
  }

  const clickHandler = () => {
    return !props.battleActive
      ?props.activeShipClickHandler(props.id)
      :undefined
  }

  const shipSunk = () => {
    if (props.battleActive && props.ship.sunk) {
      return "sunk"
    }
  }

  console.log(props.battleActive)
  
  return (
      <div 
        className={`
          ship 
          ${props.ship.name===props.activeShip.name?"active-ship":""} 
          ${props.ship.name.toLowerCase()}
          ${shipSunk()}
        `}
        data-length={props.ship.length}
        style={styles}
        onClick={clickHandler}
      >
        
        {props.showName
          ?<h3>{props.ship.name}</h3>:''
        }

      </div>
  )
}


export default Ship