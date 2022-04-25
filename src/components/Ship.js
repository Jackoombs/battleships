import React from "react";
import { useEffect } from "react";

function Ship(props) {
  
  const styles = {
    width: `${props.length*5}rem`,
    backgroundColor: `${props.color}`
  }

  const clickHandler = () => {
    props.activeShipClickHandler(props.id)
  }

  console.log()
  return (
    <div className={`ship-wrapper ${props.name===props.activeShip.name ? "active-ship" : ""}`} >
      <div 
        className="ship"
        data-length={props.length}
        style={styles}
        onClick={clickHandler}>
        <h3>{props.name}</h3>
      </div>
    </div>
  )
}


export default Ship