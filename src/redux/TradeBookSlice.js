import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    trades: []
};
  

export const tradeBookSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        addTrade: (state, action) => {
            state.trades = [...state.trades, ...action.payload]
        },
        removeTrade: (state, action) => {
            state.trades = state.trades.filter(i => i.orderno !== action.payload)   
        },
    },
})


export const { addTrade, removeTrade } = tradeBookSlice.actions

export default tradeBookSlice.reducer