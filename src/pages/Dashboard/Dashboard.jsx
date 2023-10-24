import {  Button, ClickAwayListener } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStrategy, moveStrategyHiddenToVisible} from '../../redux/StrategiesSlice'
import BarChartComponent from './BarChartComponent'
import styles from './dashboard.module.css'
import Strategies from './Strategies'
import { getStrategyWiseMTM_api } from '../../API/api'

function Dashboard() {
  const hiddenStrategies = useSelector(s => s.strategies.hiddenStrategies)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
        try {
            const {data} = await getStrategyWiseMTM_api()
            dispatch(addStrategy(data.result || []))
        } catch (error) {
            console.log(error)
        }
    })()
  }, []);

  //hide strategies
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h1>Strategy Summary P&L</h1>
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
            <div className={styles.menuButton}>
              <Button variant="outlined" type="button" onClick={handleClick} disabled={hiddenStrategies.length ? false : true}>
                Add Hideen Strategies
              </Button>
              {open && (
                <div className={styles.menuDropdown}>
                  {hiddenStrategies?.map((s) => (
                    <p className={styles.hiddenStrategy} key={s.strategyid} onClick={() =>dispatch(moveStrategyHiddenToVisible(s))} >
                      {s.algoname}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>  
        <Strategies/>
        <BarChartComponent/>
      </div>
    </div>
  )
}

export default Dashboard