import React from "react";
import BeginGameBtn from "./BeginGameBtn";
import TurnInfo from "./TurnInfo";
import HitMissNotification from "./HitMissNotification";

function Controls(props) {

  const shipsNotPlaced = props.ships.filter(ship => ship.placed===false)
  const onClickHandler = () => {
    props.setEndPlanningPhase(true)
  }

  return (
    <aside className="controls">
      {!shipsNotPlaced.length && !props.battleActive?
      <BeginGameBtn 
        onClickHandler={onClickHandler}
      />
      :<TurnInfo 
        battleActive={props.battleActive}
        playerTurn={props.playerTurn}
      />}

      {props.hitMissStatus?
        <HitMissNotification 
          hitMissStatus={props.hitMissStatus}  
        />
      :''}
    </aside>
  )
}

export default Controls