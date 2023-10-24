import React, { memo, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from "styled-components"
import OrdersHistoryTable from './OrdersHistoryTable';
import OrderErrorLogs from './OrderErrorLogs';

const TabsStyled = styled(Tabs)`
    min-height: auto !important;

    button {
        padding: 0.5rem !important;
        min-height: auto !important;
    }
`

const tabs = [
    { label: "Order Logs", value: "orders", component: <OrdersHistoryTable /> },
    { label: "Order Error Logs", value: "errors", component: <OrderErrorLogs/> },
  ];
  
  const OrderBookTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
      <>
        <TabsStyled value={activeTab} onChange={(_, i) => setActiveTab(i)} >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </TabsStyled>
        
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {tabs[activeTab].component}
        </div>
      </>
    );
  };
  

export default OrderBookTabs