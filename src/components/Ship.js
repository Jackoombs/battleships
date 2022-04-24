import React from "react";

function Ship(props) {
  
  const styles = {
    width: `${props.length*5}rem`,
    backgroundColor: `${props.color}`
  }

  return (
    <div className={`ship-wrapper ${props.name===props.activeShip.ship ? "active-ship" : ""}`} >
      <div 
        className="ship"
        data-length={props.length}
        style={styles}
        onClick={props.activeShipClickHandler}>
        <h3>{props.name}</h3>
      </div>
    </div>
  )
}


export default Ship