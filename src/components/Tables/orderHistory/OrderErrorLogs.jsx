import { memo, useEffect, useState, useCallback } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import { useMemo } from 'react';
import { useRef } from 'react';
import moment from 'moment/moment';
import { OrderErrorLogsFetch_api } from '../../../API/api';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import useSetColDef from '../../../Hookss/useSetColDef';

export const  OrdersTableHead = [
  {field: 'time', valueFormatter: (e) =>  moment(e.value).format("MM/DD/YYYY") },
];

const defaultColDef = { flex: 1, minWidth: 100, filter: true, sortable: true, resizable: true}

function OrdersHistoryTable() {
    const [data, setData] = useState([])
    const socket = useSelector(s => s.socket)
    const gridApi = useRef()
    const [setColDef] = useSetColDef(OrdersTableHead)

    const rowClassRules = useMemo(() => {
        return {
          "redRow": 'data.buysell !== 1',
          'greenRow': 'data.buysell === 1',
        };
      }, []);

    useEffect(() => {
        (async() => {
            try {
                const {data} = await OrderErrorLogsFetch_api();
                setColDef(gridApi,data.result[0])
                setData(data.result)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
    
    useEffect(() => {
        if(!gridApi.current) return
        if(!socket.status) return

        socket.connection.onmessage = (e) => {
            let newData = JSON.parse(e.data);
            if(data.event==='ordererrorlogs'){         
                setColDef(gridApi,newData.result)
                gridApi.current.api.applyTransactionAsync({
                    add: [newData.result],
                    addIndex: 0,
                });
            }
        }
    }, [gridApi.current, socket.status]);

    const onAsyncTransectionFlushed = (e) => {
        //after transidction save to redux if want
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

        <div style={{ height: "100%", width: "100%", display: "flex" }}>
            <div className="ag-theme-alpine" style={{ flex: 1 }}>
                <AgGridReact
                id="orderLogs"
                getRowId={(p) => p.data.id}
                pagination={true}
                rowData={data}
                //columnDefs={OrdersTableHead}
                defaultColDef={defaultColDef}
                rowSelection={"multiple"}
                ref={gridApi}
                suppressScrollOnNewData={true}
                groupSuppressAutoColumn={true}
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

export default memo(OrdersHistoryTable)



