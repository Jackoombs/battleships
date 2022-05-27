import React from "react";

function BeginGameBtn(props) {
  return (
    <button
      onClick={props.onClickHandler}
      className="control-btn">
      Start Battle?
    </button>
  )
}

export default BeginGameBtn