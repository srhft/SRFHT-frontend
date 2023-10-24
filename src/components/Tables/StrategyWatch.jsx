import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import {StrategyDelete_api, StrategyFetch_api, StrategyStart_api, StrategyStop_api, StrategyUpdate_api,} from "../../API/api"
import { useDispatch, useSelector } from 'react-redux'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify'
import { startLoading, stopLoading } from '../../redux/LoadingSlice'
import { addstrategyWatch, deletestrategyWatch, updatestrategyWatch } from '../../redux/StrategyWatchSlice';

function StrategyWatch() {
  const dispatch = useDispatch()
  const [strategiess, setStrategies] = useState([]);
  const strategies = useSelector(s => s.strategyWatchSlice.strategies)
    useEffect(() => {
        (async () => {
            try {
                const {data} = await StrategyFetch_api();
                dispatch(addstrategyWatch(data.result || []))
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const handleActionClick = async (e) => {
        try {
          const {data} = e.status ? await StrategyStop_api({...e, status: false}) : await StrategyStart_api({...e, status: true})
          if(data.status !== "success") return //show err
    
          const temp = e.status ? {...e, status: false} : {...e, status: true}
          dispatch(updatestrategyWatch(temp))        
          toast.success(`Strategy ${e.status ? "Stopped" : "Started"}  successfullt`)
        } catch (error) {
          console.log(error)
        }
      }

  const handleDelete = async (e) => {
    try {
      dispatch(startLoading())
      const {data} = await StrategyDelete_api(e)
      dispatch(stopLoading())
      if(data.status === "success"){
        toast.success("Strategy Deleted successfully!!")
        dispatch(deletestrategyWatch(e.id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e, strategy) => {
    let regex = /^\s*-?\d+(\.\d{1,2})?\s*$/;
    if (regex.test(Number(e.target.value))){
      dispatch(updatestrategyWatch({...strategy, qty: +e.target.value}))
    }
  }


  const handleKeyUp = async (e, strategy) => {
    if (['Enter','Tab'].includes(e.key)) {
      try {
        const {data} = await StrategyUpdate_api(strategy)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
    
    return (
        <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>ACTION</TableHeader>
              <TableHeader>TYPE</TableHeader>
              <TableHeader>AlgoN.</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Qty</TableHeader>
              <TableHeader>Delete</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {strategies.map(e => {
              return <TableRow key={e.id}>
                <TableData>{e.strategyid}</TableData>
                <TableData>{!e.status ? 
                  <PlayArrowIcon onClick={() => handleActionClick(e)}/> 
                  : 
                  <PauseIcon onClick={() => handleActionClick(e)}/>
                }</TableData>
                <TableData>{e.strategytype}</TableData>
                <TableData>{e.algoname}</TableData>
                <TableData style={{color: e.status ? "green" : "red"}} >{e.status ? "ACTIVE" : "INACTIVE"}</TableData>
                <TableData>
                  <input type="number" name="qty" value={e.qty} onChange={event => handleInputChange(event, e)} onKeyUp={event => handleKeyUp(event, e)} />
                </TableData>
                <TableData>
                  {!e.status ? <DeleteForeverIcon onClick={() => handleDelete(e)} /> : null}
                </TableData>
              </TableRow>
            })}
          </tbody>
        </Table>
      </TableContainer>
    )
}

export default StrategyWatch

const TableContainer = styled.div`
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  max-width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
  min-width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  table-layout: fixed;

`;

const TableHeader = styled.th`
  background-color: #4285f4;
  color: white;
  font-weight: bold;
  text-align: left;
  padding: 5px 5px;
`;

const TableData = styled.td`
  text-align: left;
  padding: 0 4px;
  border-bottom: 1px solid #ddd;
  

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  >svg {
    cursor: pointer;
  }
  >input{
    min-width: 4rem;
    max-width: 6rem;
    border : none;
    background: inherit;
  }
  >input:hover {
    border: 1px solid black;
  }
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
`;
