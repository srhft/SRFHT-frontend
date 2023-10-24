import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { moveStrategyVisibleToHidden } from '../../redux/StrategiesSlice';

function SingleStrategy({data, showHidtBtn}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    let style;
    Math.sign(data?.netmtm) === 1 ? style = {backgroundColor: "#EBFFE2"} : style = {backgroundColor: "#FFC9C9"}

  return (
    <div style={data.strategyid ? style : {backgroundColor: "#EEE"}} className={styles.singleStrategy} >
      <div className={styles.singleStrategyWrapper} onClick={() => navigate(`/strategy/${data.strategyid}`, {state: data})}>
        <div><p>{data.algoname}</p><p style={{fontSize: "0.9rem"}} >{data.strategytype}</p></div>
        <p>{data.netmtm.toFixed()}</p>
      </div>   
      {showHidtBtn ?<div className={styles.crossContaner} onClick={() => dispatch(moveStrategyVisibleToHidden(data))}>
        <CloseIcon/>
      </div>: null}   
    </div>
  )
}

export default SingleStrategy