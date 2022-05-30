import React from "react";

function ControlInfo(props) {

  return (
    <div 
      className="modal-outer "
      onClick={props.onClickHandler}>
      <div className="modal-inner control-info">
        <h3>Controls</h3>
        <ul>
          <li>Drag each ship to where you'd like them to sit during the battle.</li>
          <li>Tap the rotate icon to change it's orientation.</li>
          <li>Once you are happy with a ship's placement, tap the ship to confirm it's placement. </li>
          <li>To re-place a ship just tap it again. </li>
          <li>Once all five of your ships are placed, press the <strong>START GAME</strong> button</li>
        </ul>
      </div>
    </div>
  )
}

export default ControlInfo