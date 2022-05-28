import React, { useEffect, useState} from "react";

function HitMissNotification(props) {

  const [notification, setNotification] = useState()

  useEffect (() => {
    if (props.hitMissStatus === "miss") setNotification("MISS!")
    if (props.hitMissStatus === "hit") setNotification("HIT!")
    if (!props.hitMissStatus) setNotification("Preparing to fire")
  },[props.hitMissStatus])

  return (
    <div className="hit-miss">
      <h3>{notification}</h3>
    </div>  
  )
}

export default HitMissNotification