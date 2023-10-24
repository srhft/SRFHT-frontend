import { memo, useEffect, useState, useCallback } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import { useMemo } from 'react';
import { useRef } from 'react';
import moment from 'moment/moment';
import { TradeBookFetch_api } from '../../../API/api.js';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded.js';
import useSetColDef from '../../../Hookss/useSetColDef.js';


const gridOptions = {
    getRowHeight: (params) => {
      return 30; 
    }
  };

export const  OrdersTableHead = [
  {field: 'timestampns', valueFormatter: (e) =>  moment(e.value).format("hh:mm:ss a") },
];

const defaultColDef = { flex: 1, minWidth: 100, filter: true, sortable: true, resizable: true}


function TradeBook({strategy}) {
    const [data, setData] = useState([])
    const socket = useSelector(s => s.socket)
    const [setColDef] = useSetColDef(OrdersTableHead)
    const gridApi = useRef()

    const rowClassRules = useMemo(() => {
      return {
        "redRow": 'data.buysell !== 1',
        'greenRow': 'data.buysell === 1',
      };
    }, []);

    useEffect(() => {
        (async() => {
            try {
                let {data} = await TradeBookFetch_api();
                setColDef(gridApi, data.result[0])
                data = data.result.map(p => ({...p, fillprice: p.fillprice / p.divider}))
                if(strategy) {
                    setData(data.filter(e => e.strategyid === strategy).reverse())    
                  } else setData(data.reverse())    
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
    
useEffect(() => {
    let eventListener;

    if (!gridApi.current || !socket.status) return
    eventListener = (e) => {
        let newData = JSON.parse(e.data);
        if (newData.event === 'tradebook') {
            setColDef(gridApi, newData.result)
            if(strategy) {
                if(strategy !== data.result.strategyid) return //if there is specific strategy filter
            }
            gridApi.current.api.applyTransactionAsync({
                add: [newData.result],
                addIndex: 0,
            });
        }
    };
    socket.connection.addEventListener("message", eventListener);
    

    return () => {
        if (socket.status && eventListener) socket.connection.removeEventListener("message", eventListener);      
    };
}, [gridApi.current, socket.status]);




    

    const onAsyncTransectionFlushed = (e) => {
        //after transidction save to redux if required
        //dispatch(addOrderHistory(newData))
    }
  
    const onBtExport = useCallback(() => {
      gridApi.current.api.exportDataAsCsv({suppressTextAsCDATA: true});
    }, [gridApi]);

  return (
    <>        
        <div style={{display: "flex", justifyContent:"flex-end"}}>
            <div className="iconWrapper" title="Add Market Watch" onClick={onBtExport}><CloudDownloadRoundedIcon/></div>
        </div>  
        <div style={{height: "100%"}}>
            <div className="ag-theme-alpine" style={{ height: "100%" }}>
                <AgGridReact
                id="tradeBook"
                getRowId={(p) => p.data.tradedorderno}
                pagination={true}
                gridOptions={gridOptions}
                rowData={data}
                columnDefs={OrdersTableHead}
                defaultColDef={defaultColDef}
                ref={gridApi}
                // suppressScrollOnNewData={true}
                // groupSuppressAutoColumn={true}
                enableCellChangeFlash={true}
                animateRows={true}
                asyncTransactionWaitMillis={500}
                onAsyncTransactionsFlushed={onAsyncTransectionFlushed}
                rowClassRules={rowClassRules}
                debounceVerticalScrollbar={true}
                />
            </div>
        </div> 
    </>
  );
}

export default memo(TradeBook)



