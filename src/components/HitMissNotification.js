import React, { useEffect, useState} from "react";

function HitMissNotification(props) {

  const [notification, setNotification] = useState()
  console.log(props.hitMissStatus)


  useEffect (() => {
    if (props.hitMissStatus === "miss") setNotification("MISS!")
    else setNotification("HIT!")
  },[props.hitMissStatus])

  return (
    <h3>{notification}</h3>
  )
}

export default HitMissNotification