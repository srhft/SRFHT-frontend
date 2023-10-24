import { configureStore } from '@reduxjs/toolkit'
import brokerSlice from './BrokersSlice'
import strategySlice from './StrategiesSlice'
import userSlice from './UserSlice'
import SocketSlice from './SocketSlice'
import loadingSlice from './LoadingSlice'
import tradeBookSlice from './TradeBookSlice'
import tradingWindowSlice from './TradingWindowViews'
import strategyWatchSlice from './StrategyWatchSlice'



export const store = configureStore({
  reducer: {
    broker: brokerSlice,
    strategies : strategySlice,
    user: userSlice,
    socket : SocketSlice,
    loading: loadingSlice,
    trades: tradeBookSlice,
    tradingindow: tradingWindowSlice,
    strategyWatchSlice: strategyWatchSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})