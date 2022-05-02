import React, { useEffect, useState} from "react"
import battleSelectionPreview from "../utils/battleshipSelectionPreview"

function Tile(props) {

  const [initClass, setInitClass] = useState('even')
  const [isSelected, setIsSelected] = useState({selected:false})

  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  useEffect(() => {
    if (props.selectionPreview.length) {
      selectionPreview(props.currentTile, props.activeShip.length)
    }
  },[props.previewOrientation, props.activeShip])

  useEffect(() => {
  if (props.validSelection.includes(props.index)) {
    setIsSelected({selected:true, name:props.activeShip.name})
  }
  },[props.validSelection])

  useEffect(() => {
    console.log(isSelected)
  },[props.activeShip])

  const selectionPreview = (index, length) => {
    if (props.previewOrientation) {
      props.setSelectionPreview(battleSelectionPreview.horizontalPreview(index, length))
    } else {
      props.setSelectionPreview(battleSelectionPreview.verticalPreview(index, length))
      }
  }

  const passSelectionPreviewOnHover = () => {
    selectionPreview(props.index, props.activeShip.length)
  }

  const updateOrientationOnWheel = () => {
    props.setCurrentTile(props.index)
    props.setPreviewOrientation(!props.previewOrientation)
  }

  const checkTilesValidOnClick = () => {
    const filteredArray = props.selectionPreview.filter(element => props.selectedTiles.includes(element))
    if (!filteredArray.length) {
      props.setCurrentTile(props.index)
      props.setSelectedTiles(array => array.concat(props.selectionPreview))
      props.setValidSelection(props.selectionPreview)
      props.changeShipToSelected()
    }
  }

  return (
    <div 
      style={{backgroundColor:props.selectionPreview.includes(props.index)?props.activeShip.color:'' }}
      className={[initClass, 'tile', isSelected.selected?isSelected.name.toLowerCase():''].join(' ')}
      onMouseEnter={passSelectionPreviewOnHover}
      onWheel={updateOrientationOnWheel}
      onClick={checkTilesValidOnClick}
    >
      {props.index}
    </div>
      
  )
}

export default Tile