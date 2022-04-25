import React, { useEffect, useState} from "react"
import battleshipHover from "../utils/battleshipHover"

function Tile(props) {

  const [initClass, setInitClass] = useState('even')
  
  
  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  useEffect(() => {
    if (props.indexOnWheel !== null){
    selectHoverDirection(props.indexOnWheel, props.activeShip.length)
    }
    props.setIndexOnWheel(null)
  },[props.indexOnWheel])

  const onHover = (e) => {
    selectHoverDirection(e.currentTarget.getAttribute('index'), props.activeShip.length)
  }
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
      onWheel={(e) => {
        props.setIndexOnWheel(e.currentTarget.getAttribute('index'))}
      }
    >
      {props.index}
    </div>
      
  )
}

export default React.memo(Tile)