import React from "react";

function Ship(props) {
  
  const styles = {
    width: `${props.length*5}rem`,
    backgroundColor: `${props.color}`
  }

  const clickHandler = () => {
    props.activeShipClickHandler(props.id)
  }
  
  return (
      <div 
        className={`ship ${props.name===props.activeShip.name?"active-ship":""}`}
        data-length={props.length}
        style={styles}
        onClick={clickHandler}>
        <h3>{props.name}</h3>
      </div>
  )
}


export default Ship