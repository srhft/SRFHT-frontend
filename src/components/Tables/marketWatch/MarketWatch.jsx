import React, { useState } from 'react'
import MarketTable from './MarketTable'
import MainualTrade from '../../ManualTrade/MainualTrade'

function MarketWatch() {
    const [isManualTradeOpen, setIsManualTradeOpen] = useState(false)
    const [marketWatchData, setMarketWatchData] = useState({})

    const handleMarketWatchData = (data) => {
        setIsManualTradeOpen(true)
        setMarketWatchData(data)
    }

  return (
    <> 
        <MarketTable handleMarketWatchData={handleMarketWatchData} />
        <MainualTrade event="create" data={marketWatchData}  isOpen={isManualTradeOpen} setIsOpen={setIsManualTradeOpen}/>
    </>
  )
}

export default MarketWatch