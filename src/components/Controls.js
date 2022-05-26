import React from "react";

function Controls(props) {

  const shipsNotPlaced = props.ships.filter(ship => ship.placed===false)
  const onClickHandler = () => {
    props.setBattleActive(e => !e)
  }

  return (
    <aside className="controls center-content">

      {!shipsNotPlaced.length && !props.battleActive?
      <button
        onClick={onClickHandler}
        className="control-btn">
        Start Battle?
      </button>:''}

    </aside>
  )
}

export default Controls