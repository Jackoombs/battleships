import React, { useState } from "react";
import ControlInfo from "./ControlInfo";
import Rotate from "../assets/images/rotate.png"
import Info from "../assets/images/info.png"

function MobileTools(props) {

  const [showModal, setShowModal] = useState(false)

  const rotateShip = () => {
    props.setPreviewOrientation(boolean => !boolean)
  }

  const onClickHandler = () => {
    setShowModal(modal => !modal)
  }

  return (
    <div className="mobile-btns">
      <button className="mobile-btn rotate" onClick={rotateShip}>
        <img src={Rotate} alt="rotate ship" />
      </button>

      <button className="mobile-btn info" onClick={onClickHandler}>
        <img src={Info} alt="info button" />
      </button>

      {showModal?
        <ControlInfo 
          onClickHandler={onClickHandler}
        />:''
      }
      
    </div>
  )
}

export default MobileTools