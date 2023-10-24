import React from 'react'
import { useSelector } from 'react-redux'
import styles from './dashboard.module.css'
import SingleStrategy from './SingleStrategy'

function Strategies() {
    const strategies = useSelector(s => s.strategies.strategies)
  return (
    <div className={styles.strategiesContainer}>
        {strategies.map((s) => {
            return <SingleStrategy key={s.strategyid} data={s} showHidtBtn={true} />
        })}
    </div>
  )
}

export default Strategies