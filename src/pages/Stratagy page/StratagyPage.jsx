import React, {useState} from 'react'
import styles from './strategy.module.css'
import { FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import GraphComponent from '../../components/GraphComponent';
import NetPositionTable from '../../components/Tables/NetPositionTable';
import TradeBook from '../../components/Tables/TradeBook/TradeBook';
import { useLocation } from 'react-router-dom';


function StratagyPage() {

  const [isNetPositionTableVisible, setisNetPositionTableVisible] = useState(true);
  const [isOrdersTableVisible, setisOrdersTableVisible] = useState(true);

  //graph
  const [isGraphVisible, setisGraphVisible] = useState(false)
  const [minMaxOfChart, setMinMaxOfChart] = useState({min: 0, max: 0, current: 0})

  const {state} = useLocation()
    console.log({state})
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <section>
          <h2>{state.algoname} | {state.strategyid}</h2>
          {/* <p>Date: 27.10.2022, Time: 09:29:35, Nifty: 17,730, BankNifty: 42,199</p> */}
          <hr/>
        </section>     
        <section className={styles.Section}>
          <div className={styles.top}>
            <h2>Net Positions</h2>
            <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-label">Manage Visiblity</InputLabel>
              <Select onChange={(e) => setisNetPositionTableVisible(e.target.value)} value={isNetPositionTableVisible}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Manage Visiblity"
                name="broker"
              >
                <MenuItem value={true}>Show</MenuItem>
                <MenuItem value={false}>Hide</MenuItem>
              </Select>
            </FormControl>
          </div>
          <hr/>
          {isNetPositionTableVisible ? <div style={{height: "400px"}}><NetPositionTable strategy={state.strategyid}/></div> : null}
        </section>

        <section className={styles.Section}>
          <div className={styles.top}>
            <h2>Trade Book</h2>
            <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-label">Manage Visiblity</InputLabel>
              <Select onChange={(e) => setisOrdersTableVisible(e.target.value)} value={isOrdersTableVisible} 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Manage Visiblity"
                name="broker"
              >
                <MenuItem value={true}>Show</MenuItem>
                <MenuItem value={false}>Hide</MenuItem>
              </Select>
            </FormControl>
          </div>
          <hr/>
          {isOrdersTableVisible ? <div style={{height: "400px"}}><TradeBook strategy={state.strategyid}/></div> : null}
        </section>

        <section className={styles.Section}>
          <div className={styles.top}>
            <h2>Intraday PNL Max : {minMaxOfChart.max} | Min: {minMaxOfChart.min} | Current : {minMaxOfChart.current}</h2>
            <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-label">Manage Visiblity</InputLabel>
              <Select onChange={(e) => setisGraphVisible(e.target.value)} value={isGraphVisible} 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Manage Visiblity"
                name="broker"
              >
                <MenuItem value={true}>Show</MenuItem>
                <MenuItem value={false}>Hide</MenuItem>
              </Select>
            </FormControl>
          </div>
          <hr/>
          {isGraphVisible ? <GraphComponent setMInMax={setMinMaxOfChart}/> : null}
        </section>

      </div>
    </div>
  )
}

export default StratagyPage