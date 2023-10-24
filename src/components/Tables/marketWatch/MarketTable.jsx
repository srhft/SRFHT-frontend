import React, { useState, useEffect,  } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { memo } from "react";
import { useRef } from "react";
import { MarketWatchFetch_api, marketWatchSave_api, marketWatchData_api } from "../../../API/api.js";
import { AutoComplete } from "antd";
import styled from "styled-components";
import DeleteCell from "./cellRenderers/DeleteCell.jsx";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline.js';
import useSetColDef from "../../../Hookss/useSetColDef.js";
import { IntParser, RedGreenCellBasedOnOldValue, saveColDef } from "../../../utils/grid.js";

const gridOptions = {getRowHeight: (params) => 30};

const MarketWatchHead = [
    {field: "exchange", minWidth: 100},
    {field: "symbol", minWidth: 200,},
    {field: "bid",  minWidth: 150, cellStyle: RedGreenCellBasedOnOldValue , cellRenderer: 'agAnimateShowChangeCellRenderer',} ,   
    {field: "bidqty",  minWidth: 150, cellStyle: RedGreenCellBasedOnOldValue , cellRenderer: 'agAnimateShowChangeCellRenderer',},
    {field: "ask", minWidth: 150, cellStyle: RedGreenCellBasedOnOldValue , cellRenderer: 'agAnimateShowChangeCellRenderer',},
    {field: "askqty", minWidth: 150, cellStyle: RedGreenCellBasedOnOldValue , cellRenderer: 'agAnimateShowChangeCellRenderer',},
    {field: "ltp",  flex: 1},
    {field: "ltq", flex: 1},
    {field: "action", headerName: "ACTION", width: 100, cellRenderer: DeleteCell, cellStyle: {'textAlign': 'center'}, pinned: "right"  },
  ];
  
  
function MarketWatchTable({handleMarketWatchData}) {
  const socket = useSelector(s => s.socket)
  const [data, setData] = useState([])
  const [symbolOptions, setSymbolOptions] = useState([])
  const [exchangeOptions, setExchangeOptions] = useState([])
  const [selectedData, setselectedData] = useState({exchange: "", symbol: ""})
  const [setColDef] = useSetColDef(MarketWatchHead)

  const gridApi = useRef()
  useEffect(() => {

    (async () => {
        try {
            const {data} = await MarketWatchFetch_api();
            const resultArray = Object.values(data.result).map((item) => {
              return { ...item, opttype: item.optiontype, optiontype: undefined};
            });
            setColDef(gridApi,resultArray[0])
            setData(resultArray)
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
        if(data.event!=='tickerUpdate') return 
        gridApi.current.api.applyTransactionAsync({
            update: [newData.result]
        })
    }
    socket.connection.addEventListener("message", eventListener);
    

    return () => {
        if (socket.status && eventListener) socket.connection.removeEventListener("message", eventListener);      
    };
}, [gridApi.current, socket.status]);




  const handleSave = async (row) => {
    try {
      const {data} = await marketWatchSave_api(row);
      if(data.status !== "success") {
        toast.error("MarketWatch with this Data already exist");
        return false
      }
      socket.connection.send(JSON.stringify({ "event": "addTicker", "token": row.tokenID2 }))
      console.log(data) 
    } catch (error) {
      console.log(error)
      toast.error("Internal server error")
      return false
    }
    return true
  }

  const handleAddParity = (e) => {
    e.preventDefault();
    const selectedSymbolData = symbolOptions[0];
    if(!selectedData.exchange.length) return toast.info("Please Select Exchange First!!");
    if(!selectedData.symbol.length) return toast.info("Please Select Symbol First!!");
    console.log({selectedSymbolData})
    const item2 = {
      segment: selectedSymbolData.segment,
      exchange: selectedData.exchange, 
      symbol: selectedData.symbol,  
      bid: 0,  bidqty: 0,  ask: 0,  askqty: 0,  ltp: 0,  ltq: 0, buysell: 0, cancel: true,
      token: selectedSymbolData.token,
      tokenid: selectedSymbolData.tokenID, 
      tokenid2: selectedSymbolData.tokenID2, 
      securitytype: selectedSymbolData.security_type,
      expirydate: selectedSymbolData.expiry,
      opttype: selectedSymbolData.option_type,
      ticksize: selectedSymbolData.tick_size,
      strikeprice: selectedSymbolData.strike_price != '-1' ? selectedSymbolData.strike_price/100 : selectedSymbolData.strike_price,
      qty: selectedSymbolData.lot_size,
      divider: selectedSymbolData.divider,
      lotsize: selectedSymbolData.lot_size
   }
    const res = handleSave(item2)
    setColDef(gridApi,item2)
    if(!res) return 
    if(gridApi.current){  
        gridApi.current.api.applyTransaction({
        add: [item2],
        addIndex: 0,
        })
      }
    setselectedData({exchange: "", symbol: ""})
  }



  const handleKeyPress = (e) => {
    if(!gridApi.current) return;
    if (!['F1', '+', 'F2', '-'].includes(e.key)) return
    e.preventDefault();

    const data = gridApi.current.api.getSelectedRows()[0];  
    console.log({selectedData: data})
    if (['F1', '+'].includes(e.key)) handleMarketWatchData({...data, buysell: 1, price: data.ask});
    else if (['F2', '-'].includes(e.key)) handleMarketWatchData({...data, buysell: 2, price: data.bid});
  };
  

const fetchExchangeOptions = async () => {
  if(!selectedData.exchange) return
  try {
    const { data } = await marketWatchData_api({ type: "normal", exchange: selectedData.exchange, token: "" });
    setExchangeOptions(data.result?.exchange || []);
  } catch (error) {
    console.log(error);
  }
};

const fetchSymbolsOptions = async () => {
  if(!selectedData.exchange && selectedData.symbol) return toast.info("Please select Exchange  first!!")
  try {
    const { data } = await marketWatchData_api({type: 'normal', exchange: selectedData.exchange, token: selectedData.symbol});
    setSymbolOptions(data.result.tokenDetails);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchExchangeOptions()
},[selectedData.exchange])

useEffect(() => {
  fetchSymbolsOptions()
},[selectedData.symbol])



  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }} onKeyDown={handleKeyPress}>
      <AddWrapper onSubmit={handleAddParity}>
            <AutoComplete  style={{width: "200px"}}
            placeholder="Enter Exchange"
                value={selectedData.exchange}
                onChange={e => setselectedData(p => ({...p, exchange: e}))}
                onSelect={e => setselectedData(p => ({...p, exchange: e}))}
                options={exchangeOptions.map((option) => ({ value: option }))}
            />
            <AutoComplete
            placeholder="Enter Symbol"
            value={selectedData.symbol}
            onChange={e => setselectedData(p => ({...p, symbol: e}))}
            onSelect={e => setselectedData(p => ({...p, symbol: e}))}
            options={symbolOptions.map((option) => ({ value: option.ticker_code}))}
            />
            <button type="submit" className="iconWrapper" title="Add Market Watch" ><AddCircleOutlineIcon/></button>
      </AddWrapper>
      <div style={{ height: "96%", width: "100%", display: "flex",  }}>
        <div className="ag-theme-alpine" style={{ flex: 1 }}>
          <AgGridReact
            onColumnMoved={e => saveColDef("marketWatch",e)}
            id="marketWatch"
            gridOptions={gridOptions}
            getRowId={(p) => p.data.tokenid2}
            pagination={true}
            rowData={data}
            columnDefs={MarketWatchHead}
            defaultColDef={{             
              flex: 1,
              minWidth: 100,
              filter: true,
              sortable: true,
              resizable: true,
              valueFormatter: IntParser
            }}
            ref={gridApi}
            suppressScrollOnNewData={true}
            groupSuppressAutoColumn={true}
            allowShowChangeAfterFilter={true}
            animateRows={true}
            rowSelection={'single'}
        
            //transections
            asyncTransactionWaitMillis={500}
          
          />
        </div>
      </div> 
    </div>
  );
}



export default memo(MarketWatchTable);


const AddWrapper = styled.form`
  display: flex;
  align-items: center;
  max-width: 500px;
  gap: 0.5rem;
  padding:  0.5rem 0.5rem 0.5rem 0;
  >button {
    border: none;
    width: 50px;
    >svg{
        font-size: 3rem;
    }
  }

`
