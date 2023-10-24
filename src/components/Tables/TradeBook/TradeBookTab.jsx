import React, { memo, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TradeBook from './TradeBook';
import styled from "styled-components"
import ManualTradeTable from '../../ManualTrade/ManualTradeTable';

const TabsStyled = styled(Tabs)`
    min-height: auto !important;

    button {
        padding: 0.5rem !important;
        min-height: auto !important;
    }
`

const tabs = [
    { label: "Trade Book", value: "tradebook", component: <TradeBook /> },
    { label: "Manual Trade", value: "manualtrade", component: <ManualTradeTable /> },
  ];
  
  const TradeBookTab = () => {
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
  

export default TradeBookTab