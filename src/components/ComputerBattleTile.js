import React from "react";
import { useEffect, useState } from "react";

function ComputerBattleTile(props) {

  const [initClass, setInitClass] = useState('even')
  const [hover, setHover] = useState(false)
  const [hitOrMiss, setHitOrMiss] = useState(false)

  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  const checkHit = (index, ships) => {
    for (const ship of ships) {
      if (ship.indexs.includes(index)) return true
    }
  }

  const setHoverEffect = () => {
    return !hitOrMiss && hover  && !props.disableClick? 'select-target' : ''
  }

  useEffect(() => {
    if (props.disableClick === props.index) {
      const isHit = checkHit(props.index, props.computerShips)
      props.updateHitMissStatus(isHit)
      
      if (isHit) props.setComputerHit(oldArray => [...oldArray, props.index]);
      else props.setComputerMissed(oldArray => [...oldArray, props.index]);
      
      setTimeout(() => {
        props.setDisableClick(false)
        props.setPlayerTurn(playerTurn => !playerTurn)
        props.updateHitMissStatus('reset')
      }, 2000);
    }
  },[props.disableClick])

  useEffect(() => {
    if (props.computerHit.includes(props.index)) setHitOrMiss('hit')
    if (props.computerMissed.includes(props.index)) setHitOrMiss('miss')
  },[props.computerMissed, props.computerHit])

  const clickHandler = () => {
    props.setDisableClick(props.index)
  }

  return (
    <div 
      className={`${initClass} tile ${hitOrMiss?hitOrMiss:''} ${setHoverEffect()}`}
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
      onClick={!props.disableClick&&!hitOrMiss?clickHandler:undefined}>
      {/* {props.index} */}
    </div>
  )
}

export default ComputerBattleTile