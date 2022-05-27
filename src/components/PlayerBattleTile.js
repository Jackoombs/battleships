import React, { useState } from "react";
import { useEffect } from "react";

function PlayerBattleTile(props) {

  const [initClass, setInitClass] = useState('even')
  const [isShip, setIsShip]= useState('')
  const [hitOrMiss, setHitOrMiss] = useState(false)
  

  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  useEffect(() => {
    for (const ship of props.playerShips) {
      if (ship.tileIndexs.includes(props.index)) setIsShip(ship.name.toLowerCase())
    } 
  },[])

  useEffect(() => {
    if (props.playerHit.includes(props.index)) setHitOrMiss('hit')
    if (props.playerMissed.includes(props.index)) setHitOrMiss('miss')
  },[props.playerMissed, props.playerHit])

  return (
    <div className={`${initClass} tile ${hitOrMiss?hitOrMiss:''} ${isShip}`}>
    </div>
  )
}

export default PlayerBattleTile