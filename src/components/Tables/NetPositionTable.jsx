import React, { useState, useEffect, useCallback,  } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { useRef } from "react";
import { NetpositionFetch_api } from "../../API/api.js";
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded.js';
import useSetColDef from "../../Hookss/useSetColDef.js";
import ToggleColumns from "../ToggleColumns.jsx";
import { IntParser, setColorBasedOnPoNag } from "../../utils/grid.js";


const NetPositionColumns = [
  {field: "strategyid",pinned: 'left', width: 90, cellStyle: {'textAlign': 'center'} },
  {field: "tokenid2",pinned: 'left', width: 100 },
  {field: "exchange", pinned: 'left', width: 30, cellStyle: {'textAlign': 'center'}},
  {field: "symbol",  flex: 2, cellStyle: {'textAlign': 'center'},  pinned: 'left', width: 50},
  {field: "option_type",pinned: 'left', width: 50, cellStyle: {'textAlign': 'center'} },
  {field: "expirydate", pinned: 'left', width: 50, cellStyle: {'textAlign': 'center'} },
  {field: "ltp",valueParser: (p) => +p.value, },
  {field: "grossmtm", flex: 1, cellStyle: setColorBasedOnPoNag, cellRenderer: 'agAnimateShowChangeCellRenderer',},
  {field: "netmtm", flex: 1, cellStyle: setColorBasedOnPoNag, cellRenderer: 'agAnimateShowChangeCellRenderer',},
  {field: "todaybrokamt", flex: 1, },
];

const calcTotalWorker = new Worker('/workers/getTotal.js');
function getTotal(gridApi, colDef) {   
    if(!colDef) return 
    const gridRows = [];

    gridApi.current?.api?.forEachNodeAfterFilterAndSort((n) => gridRows.push(n.data));

    const colDefString = JSON.stringify(colDef)
    calcTotalWorker.postMessage({gridRows, colDefString})
}


function NetPositionTable({strategy}) {
  const socket = useSelector(s => s.socket)
  const [data, setData] = useState([])

  const [setColDef, colDef] = useSetColDef(NetPositionColumns)
  const gridApi = useRef()

    const setTotal = () =>  getTotal(gridApi, colDef) 

    calcTotalWorker.onmessage = ({data}) => {
        const pinnedRowNode = gridApi?.current?.api?.getPinnedBottomRow(0);
        pinnedRowNode?.setData({ ...pinnedRowNode.data, ...data });
    }

  useEffect(() => {
    
    let eventListener;
    if(!gridApi.current) return
    if(!socket.status) return

    eventListener = (e) => {
      let data = JSON.parse(e.data);
      if(data.event!=='netpositionUpdate') return 
      setColDef(gridApi, data.result)
      if(strategy) {
          if(strategy !== data.result.strategyid) return //if there is specific strategy filter
      }
      const rowNode = gridApi.current.api.getRowNode(data.result.netpositionno)?.data;
      if(rowNode){
        let updatedData;
        const oldValue = rowNode.ltp;
        if (data.result.ltp > oldValue) updatedData = {...data.result, isPositive: true}
        else  updatedData = {...data.result, isPositive: false}
           
        updatedData = {...data.result, 
          ltp: data.result/100,
          grossmtm: rowNode.cfamt+(rowNode.cfqty*(data.result.ltp/100)*rowNode.multiplier),
          netmtm:(rowNode.cfamt+(rowNode.cfqty*(data.result.ltp/100)*rowNode.multiplier))-rowNode.todaybrokamt
        }
        gridApi.current.api.applyTransactionAsync({
            update: [data.result],
        })
 
      } else{
        gridApi.current.api.applyTransaction({
          add: [data.result],
          addIndex: 0,
        })
      }
    };
    socket.connection.addEventListener("message", eventListener);
        
    return () => {
        if (socket.status && eventListener) socket.connection.removeEventListener("message", eventListener);
    };
    
  }, [gridApi.current, socket.status]);

  useEffect(() => {
    (async() => {
      try {
          const {data} = await NetpositionFetch_api();
          setColDef(gridApi, data.result[0])
          if(strategy) {
            setData(data.result.filter(e => e.strategyid === strategy))    
          } else setData(data.result)       
          
      } catch (error) {
          console.log(error)
      }
  })()
  },[])

  const gridOptions = {
    getRowHeight: () => {
      return 30; 
    }
  };

  const onBtExport = useCallback(() => {
    gridApi.current.api.exportDataAsCsv({suppressTextAsCDATA: true});
  }, [gridApi]);


  return (
    <>
        <div style={{display: "flex", justifyContent:"flex-end", gap: "0.5rem"}}>
            <div className="iconWrapper" title="Add Market Watch" onClick={onBtExport}><CloudDownloadRoundedIcon/></div>
            <ToggleColumns colDef={colDef} columnApi={gridApi} />
        </div>  
        <div style={{ height: "100%", width: "100%", display: "flex",  }}>
        <div className="ag-theme-alpine" style={{ flex: 1 }}>
            <AgGridReact
            id="netPosition"
            getRowId={(p) => p.data.netpositionno}
            pagination={true}
            rowData={data}
            // columnDefs={NetPositionColumns}
            gridOptions={gridOptions}
            defaultColDef={{
                flex: 1,
                minWidth: 100,
                filter: true,
                sortable: true,
                resizable: true,
                valueFormatter: IntParser,
                cellStyle: {'textAlign': 'right', "minWidth": "max-content"},
                cellFlashDelay: 100,
            }}
            ref={gridApi}
            suppressScrollOnNewData={true}
            groupSuppressAutoColumn={true}
            allowShowChangeAfterFilter={true}
            animateRows={true}
            pinnedBottomRowData={[{}]}
            enableCellChangeFlash={true}
            onModelUpdated={setTotal}
            debounceVerticalScrollbar={true}

            
            //transections
            asyncTransactionWaitMillis={500}
            //onAsyncTransactionsFlushed={onAsyncTransactionsFlushed}          
            />
        </div>
        </div> 
    </>
  );
}



export default memo(NetPositionTable);
