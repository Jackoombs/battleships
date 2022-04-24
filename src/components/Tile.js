import { hover } from "@testing-library/user-event/dist/hover"
import React, { useEffect, useState } from "react"
import battleshipHover from "../utils/battleshipHover"

function Tile(props) {

  const [initClass, setInitClass] = useState('even')
  const [hoverOrientation, setHoverOrientation] = useState(true)
  
  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  const onHover = () => {
    props.setCurrentTile(props.index)
    selectHoverDirection()
  }

  const selectHoverDirection = () => {
    if (hoverOrientation) return props.setShipHover(battleshipHover.horizontalHover(props.currentTile, props.activeShip.length))
    return props.setShipHover(battleshipHover.verticalHover(props.currentTile, props.activeShip.length))
  }

  window.addEventListener("wheel", () => {
    setHoverOrientation(!hoverOrientation)
  })

  return (
    <div 
      style={{backgroundColor: props.shipHover.includes(props.index)?`${props.activeShip.color}`: ''}}
      className={[initClass, 'tile', props.shipHover.includes(props.index)?'hover-active':''].join(' ')} 
      index={props.index}
      onMouseEnter={onHover}
    >
      {props.index}
    </div>
      
  )
}

export default Tile