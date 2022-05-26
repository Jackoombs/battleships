import React, { useState } from "react";
import { useEffect } from "react";

function PlayerBattleTile(props) {

  const [initClass, setInitClass] = useState('even')
  const [hover, setHover] = useState(false)
  const [hitMissClass, setHitMissClass] = useState(false)
  const [clicked, setClicked] = useState(false)
  

  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  return (
    <div 
      className={`${initClass} tile ${hitMissClass?hitMissClass:''}`}
      style={{backgroundColor:hover?'black':''}}
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
      // onClick={!clicked?onClickHandler:''}
    >
      {props.index}
    </div>
  )
}

export default PlayerBattleTile