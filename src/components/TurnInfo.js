import React from "react";

function TurnInfo(props) {

  const headerText = () => {
    if (!props.battleActive) return "Planning Phase"
    if (props.playerTurn) return "Your Turn"
    return "Computers Turn"
  }

  const turnDescription = () => {
    if (!props.battleActive) return "Decide where to place your ships."
    if (props.playerTurn) return "Decide where you'd like to fire your artillery" 
    return "It's the enemies turn to try and sink you."
  }

  return (
    <div className="turn-info">
      <h2>{headerText()}</h2>
      <p>{turnDescription()}</p>
    </div>
  )
}

export default TurnInfo