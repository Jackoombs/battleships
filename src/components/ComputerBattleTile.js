import React from "react";
import { useEffect, useState } from "react";

function ComputerBattleTile(props) {

  const [initClass, setInitClass] = useState('even')
  const [hover, setHover] = useState(false)
  const [hitMissClass, setHitMissClass] = useState(false)

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

  useEffect(() => {
    if (props.computerHit.includes(props.index)) {
      setHitMissClass('hit')
    }
    if (props.computerMissed.includes(props.index)) {
      setHitMissClass('miss')
    }
  },[props.computerMissed, props.computerHit])

  const onClickHandler = () => {
    const isHit = checkHit(props.index, props.computerShips)
    if (isHit) props.setComputerHit(oldArray => [...oldArray, props.index]);
    else props.setComputerMissed(oldArray => [...oldArray, props.index]);
    
    setTimeout(() => {
      props.setPlayerTurn(playerTurn => !playerTurn)
    }, 3000);
  }

  return (
    <div 
      className={`${initClass} tile ${hitMissClass?hitMissClass:''}`}
      style={{backgroundColor:hover?'black':''}}
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
      onClick={onClickHandler}>
      {props.index}
    </div>
  )
}

export default ComputerBattleTile