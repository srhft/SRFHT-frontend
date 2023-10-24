import { memo, useEffect, useState, useCallback } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import { useMemo } from 'react';
import { useRef } from 'react';
import moment from 'moment/moment';
import { ManualTradeFetch_api } from "../../API/api"
import ManualTradeActionsCell from './CellRenderer/ManualTradeActionsCell';
import MainualTrade from './MainualTrade';
import { toast } from 'react-toastify';
import { addTrade } from '../../redux/TradeBookSlice';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';



const gridOptions = {
    getRowHeight: () => {
      return 30; 
    }
};

const defaultColDef = { flex: 1, minWidth: 100, filter: true, sortable: true, resizable: true}


function ManualTradeTable() {
    const [isManualTradeOpen, setisManualTradeOpen] = useState(false)
    const [selectedRow, setselectedRow] = useState(null)
    const  OrdersTableHead = [
        {headerName: "OrderNo", field: 'orderno'},
        {headerName: "buysell", field: 'buysell'},
        {headerName: "EXCHANGE", field: 'exchange'},
        {headerName: "SECURITYTYPE", field: 'security_type'},
        {headerName: "EXPIRY", field: 'expirydate' , valueFormatter: (e) =>  moment(e.value).format("hh:mm:ss a") },
        {headerName: "OPTTYPE", field: 'option_type'},
        {headerName: "STRIKEPRICE", field: 'strike_price', valueGetter: (params) => params.data.strike_price / params.data.divider},
        {headerName: "QTY", field: 'vol'},
        {headerName: "Pending QTY", field: 'totvolrem'},
        {headerName: "Price", field: 'price', valueGetter: (params) => params.data.price / params.data.divider},
        {headerName: "TriggerPrice", field: 'triggerprice'},
        {headerName: "status", field: 'status'},
        {headerName: "ACTIONS", field: 'status', 
            cellRenderer: p => <ManualTradeActionsCell {...p} myState={{ setisManualTradeOpen, setselectedRow}} />,
            pinned: "right",
            width: 100,
            cellStyle: {"textAlign": "center"}
        },
      ];
    const [data, setData] = useState([
        { orderno: 1, buysell: 1, exchange: '2023-05-07T10:15:30Z', security_type: 'EQ', expirydate: '2023-05-31', option_type: 'CE',  strike_price: 3500, price: 15000, divider: 100 , vol: 50, totvolrem: 20, triggerprice: 15500, status: 'PENDING', tokenid2: 12345 },
        { orderno: 2, buysell: 2, exchange: '2023-05-07T12:15:30Z', security_type: 'EQ', expirydate: '2023-06-30', option_type: 'PE',  strike_price: 3600, price: 2000, divider: 100 , vol: 100, totvolrem: 50, triggerprice: 1900, status: 'EX_TR', tokenid2: 12346 },
        { orderno: 3, buysell: 1, exchange: '2023-05-07T14:15:30Z', security_type: 'EQ', expirydate: '2023-07-31', option_type: 'CE',  strike_price: 3700, price: 5000, divider: 100 , vol: 20, totvolrem: 10, triggerprice: 5500, status: 'EX_CXL', tokenid2: 12347 },
        { orderno: 4, buysell: 2, exchange: '2023-05-07T16:15:30Z', security_type: 'EQ', expirydate: '2023-08-31', option_type: 'PE',  strike_price: 3800, price: 8000, divider: 100 , vol: 75, totvolrem: 25, triggerprice: 7500, status: 'REJ_NEW', tokenid2: 12348 },
        { orderno: 5, buysell: 1, exchange: '2023-05-07T14:15:30Z', security_type: 'EQ', expirydate: '2023-09-31', option_type: 'CE',  strike_price: 3700, price: 2000, divider: 100 , vol: 20, totvolrem: 10, triggerprice: 5500, status: 'EX_CONF', tokenid2: 123847 },
        { orderno: 6, buysell: 2, exchange: '2023-05-07T16:15:30Z', security_type: 'EQ', expirydate: '2023-10-31', option_type: 'PE',  strike_price: 3800, price: 2000, divider: 100 , vol: 75, totvolrem: 25, triggerprice: 7500, status: 'EX_MOD', tokenid2: 122348 },
      ])
    const socket = useSelector(s => s.socket)
    const dispatch = useDispatch()
    const gridApi = useRef()

    const rowClassRules = useMemo(() => {
      return {
        "redRow": 'data?.buysell !== 1',
        'greenRow': 'data?.buysell === 1',
      };
    }, []);

    // useEffect(() => {
    //     (async() => {
    //         try {
    //             const {data} = await ManualTradeFetch_api()
    //             setData(data.result.reverse())
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })()
    // },[])
    
useEffect(() => {
    let eventListener;

    if (!gridApi.current || !socket.status) return
    eventListener = (e) => {
        let newData = JSON.parse(e.data);
        console.log(newData)
        if (newData.event === 'manualtrade') {
            gridApi.current.api.applyTransaction({
                add: [newData.result],
                addIndex: 0,
            });
            dispatch(addTrade(newData.result))
        }
    };
    socket.connection.addEventListener("message", eventListener);
    

    return () => {
        if (socket.status && eventListener) socket.connection.removeEventListener("message", eventListener);      
    };
}, [gridApi.current, socket.status]);


const handleKeyPress = (e) => {
    if(!gridApi.current) return 
    if (['F1', '+'].includes(e.key)) {
        e.preventDefault();
        const selectedRow = gridApi.current.api.getSelectedRows();
        if(!selectedRow.length) return 
        if (['EX_CONF', 'EX_MOD', 'REJ_MOD'].indexOf(selectedRow[0].status) > -1) {
            setselectedRow(selectedRow[0])
            setisManualTradeOpen(true)
        } else toast.info("You can not Edit this Trade!!")
    }
}

    

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
        <div style={{height: "100%"}} >
            <div className="ag-theme-alpine" style={{ height: "100%" }} onKeyDown={handleKeyPress}>
                <AgGridReact
                getRowId={(p) => p.data.orderno}
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
                rowSelection={'single'}
                debounceVerticalScrollbar={true}
                />
            </div>
        </div> 
        <MainualTrade event="modify" data={selectedRow} isOpen={isManualTradeOpen} setIsOpen={setisManualTradeOpen} />
    </>
  );
}

export default memo(ManualTradeTable)



