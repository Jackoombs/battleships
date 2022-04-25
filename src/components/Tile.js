import React, { useEffect, useState} from "react"
import battleshipHover from "../utils/battleshipHover"

function Tile(props) {

  const [initClass, setInitClass] = useState('even')
  
  
  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  // useEffect(() => {
  //   selectHoverDirection()
  // },[props.activeShip, props.hoverOrientation])

  const onHover = (e) => {
    selectHoverDirection(e.currentTarget.getAttribute('index'), props.activeShip.length)
  }
  console.log(props.isActive, props.index)

  const selectHoverDirection = (index, length) => {
    if (props.hoverOrientation) return props.setShipHover(battleshipHover.horizontalHover(index, length))
    return props.setShipHover(battleshipHover.verticalHover(index, length))
  }

  return (
    <div 
      style={{backgroundColor: props.isActive?`${props.activeShip.color}`: ''}}
      className={[initClass, 'tile'].join(' ')} 
      index={props.index}
      onMouseEnter={onHover}
    >
      {props.index}
    </div>
      
  )
}

export default React.memo(Tile)