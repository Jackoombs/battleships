import React, { useEffect, useState} from "react"
import battleshipHover from "../utils/battleshipHover"

function Tile(props) {

  const [initClass, setInitClass] = useState('even')
  const [selected, setSelected] = useState({selected: false})
  
  // set initial chequered board pattern
  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  useEffect(() => {
    console.log(selected)
  },[selected])

  useEffect(() => {
    console.log(props.isValid, props.index)
    if (props.isValid) {
      setSelected({selected:true, ship:props.activeShip.name})
    }
  },[props.isValid])


  //flip the hover direction on mouse wheel
  useEffect(() => {
    if (props.indexOnWheel !== null){
      selectHoverDirection(props.indexOnWheel, props.activeShip.length)
    }
    props.setIndexOnWheel(null)
  },[props.indexOnWheel])

  //preview the ship placement on hover
  const showShipOnHover = (e) => {
    selectHoverDirection(e.currentTarget.getAttribute('index'), props.activeShip.length)
  }

  //set which tiles should be highlighted on hover
  const selectHoverDirection = (index, length) => {
    if (props.hoverOrientation) return props.setShipHover(battleshipHover.horizontalHover(index, length))
    return props.setShipHover(battleshipHover.verticalHover(index, length))
  }

  return (
    <div 
      style={{backgroundColor: props.isActive?`${props.activeShip.color}`: ''}}
      className={[initClass, 'tile', selected.selected?selected.ship.toLowerCase():''].join(' ')} 
      index={props.index}
      onMouseEnter={showShipOnHover}
      //this remembers the index of the tile on mouse wheel
      onWheel={(e) => {
        props.setIndexOnWheel(e.currentTarget.getAttribute('index'))}
      }
      onClick={props.onClickValidCheck}
    >
      {props.index}
    </div>
      
  )
}

export default React.memo(Tile)