import React, { useEffect, useState} from "react"
import battleSelectionPreview from "../utils/battleshipSelectionPreview"

function SelectionPhaseTile(props) {

  const [initClass, setInitClass] = useState('even')
  const [isSelected, setIsSelected] = useState({selected:false})

  useEffect(() => {
    if (props.index > 9 && String(props.index)[0] % 2 === 1 && props.index % 2 === 0)  setInitClass('odd')
    if (props.index > 9 && String(props.index)[0] % 2 === 0 && props.index % 2 === 1) setInitClass('odd')
    if (props.index < 10 && props.index % 2 === 1) setInitClass('odd')
  },[])

  // Update the UI when ship orientation or active ship changes.
  useEffect(() => {
    if (props.selectionPreview.length) {
      selectionPreview(props.currentTile, props.activeShip.length)
    }
  },[props.previewOrientation, props.activeShip])

  // When the user places a ship, update the tile state to show the tiles are taken.
  useEffect(() => {
  if (props.validSelection.includes(props.index)) {
    setIsSelected({selected:true, name:props.activeShip.name, orientation: props.previewOrientation})
  }
  },[props.validSelection])

  // If the active ship changes to an already placed ship then remove the ship from the board so it can be re-placed.
  useEffect(() => {
    if (!props.activeShip.placed && isSelected.name === props.activeShip.name) {
      setIsSelected({selected:false})
      props.setSelectedTiles(oldArray => oldArray.filter(element => element!==props.index))
      
      if (props.currentTile) {
        selectionPreview(props.currentTile, props.activeShip.length)
      } 
    } 
  },[props.activeShip])

  const selectionPreview = (index, length) => {
      props.setSelectionPreview(battleSelectionPreview(index, length, props.previewOrientation))
  }

  const passSelectionPreviewOnHover = () => {
    selectionPreview(props.index, props.activeShip.length)
  }

  const updateOrientationOnWheel = () => {
    props.setCurrentTile(props.index)
    props.setPreviewOrientation(!props.previewOrientation)
  }

  // If the selection is valid on click then change the activeShip select state and update the selected tiles.
  const checkTilesValidOnClick = () => {
    const filteredArray = props.selectionPreview.filter(element => props.selectedTiles.includes(element))
    if (!filteredArray.length) {
      props.setCurrentTile(props.index)
      props.setSelectedTiles(array => array.concat(props.selectionPreview))
      props.setValidSelection(props.selectionPreview)
      props.changeShipSelectedStatus(props.activeShip, true)
    }
  }

  // If all ships have been placed, allow the user to re-place by clicking on ship.
  const changeActiveShipOnClick = () => {
    if (!props.activeShip.name && isSelected.selected) {
      const newActiveShip = props.ships.filter(ships => ships.name === isSelected.name)
      props.changeShipSelectedStatus(newActiveShip[0], false)
      props.setPreviewOrientation(isSelected.orientation)
    }
  } 

  const tileClickHandler = () => {
    checkTilesValidOnClick()
    changeActiveShipOnClick()
  }

  const setBackgroundOnHover = () => {
    if (!props.validOnHover && props.selectionPreview.includes(props.index)) return 'grey'
    if (props.selectionPreview.includes(props.index)) return props.activeShip.color
    return ''
  }

  // When the user starts the game, the placement of ships is saved to state in App
  useEffect(() => {
    return () => {
      if (isSelected.selected) {
        const shipIndex = props.playerShips.findIndex(ship => ship.name === isSelected.name)
        const newPlayerShips = [...props.playerShips]
        newPlayerShips[shipIndex].tileIndexs.push(props.index)
        props.setPlayerShips(newPlayerShips)
      }
      props.setBattleActive(true)
    }
  },[props.endPlanningPhase])

  return (
    <div 
      style={{backgroundColor:setBackgroundOnHover()}}
      className={[initClass, 'tile', isSelected.selected?isSelected.name.toLowerCase():''].join(' ')}
      onMouseEnter={passSelectionPreviewOnHover}
      onWheel={updateOrientationOnWheel}
      onClick={tileClickHandler}
    >
      {props.index}
    </div>
      
  )
}

export default SelectionPhaseTile