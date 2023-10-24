import { Button } from '@mui/material'
import React from 'react'
import styles from "./Card.module.css"

function Card({img, title, subTitle, cta}) {
    console.log("hemloo")
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <img src={img}/>
        </div>
        <div className={styles.btoom}>
            <h3>{title}</h3>
            <p>{subTitle}</p>
            {cta && <Button>{cta}</Button>}
        </div>
    </div>
  )
}

export default Card