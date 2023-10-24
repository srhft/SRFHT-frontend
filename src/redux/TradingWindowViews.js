import { createSlice } from '@reduxjs/toolkit'

import NetPositionTable from '../components/Tables/NetPositionTable';
import StrategyWatch from '../components/Tables/StrategyWatch';
import MarketWatch from '../components/Tables/marketWatch/MarketWatch';
import TradeBookTab from '../components/Tables/TradeBook/TradeBookTab';
import OrderBookTabs from '../components/Tables/orderHistory/OrderBookTabs';

const initialState = [
    {id: 1, title: "StrategyWatch", element: StrategyWatch, config: { i: '1', x: 0, y: 0, w: 8, h: 10, minW: 6 }, visible: true},
    {id: 2, title: "Market Watch", element: MarketWatch, config: { i: '2', x: 10, y: 0, w: 12, h: 10 } , visible: true},
    {id: 3, title: "Position", element: NetPositionTable, config: { i: '3', x: 0, y: 10, w: 20, h: 14 }, visible: true},
    {id: 4, title: "Trade", element: TradeBookTab, config: { i: '4', x: 0, y: 20, w: 10, h: 10 }, visible: true},
    {id: 5, title: "Orders Log", element: OrderBookTabs, config: { i: '5', x: 10, y: 20, w: 10, h: 10 }, visible: true},
]

export const tradingWindowSlice = createSlice({
  name: 'tradingWindow',
  initialState,
  reducers: {
    changeViewsVisiblity: (state, action) => {
      const index = action.payload;
      const newState = [...state];
      newState[index] = { ...newState[index], visible: !newState[index].visible};
      return newState;   
    },
  },
})

export const { changeViewsVisiblity } = tradingWindowSlice.actions

export default tradingWindowSlice.reducer
