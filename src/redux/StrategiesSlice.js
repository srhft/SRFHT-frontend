import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    strategies: [

    ],
    hiddenStrategies: [

    ]

  };
  

export const strategySlice = createSlice({
    name: 'strategy',
    initialState,
    reducers: {
        addStrategy: (state, action) => {
            if (Array.isArray(action.payload)) state.strategies = action.payload;
            else state.strategies = [...state.strategies, action.payload]    
          },
        updateStrategies: (state, action) => {
            state.strategies.forEach((s, index) => {
                if(s.strategyid === action.payload.strategyid){
                    state.strategies[index] = action.payload
                }
            })
        },
        moveStrategyVisibleToHidden: (state, action) => {
            state.strategies = state.strategies.filter(s => s.strategyid !== action.payload.strategyid);
            state.hiddenStrategies = [...state.hiddenStrategies, action.payload]
        },
        moveStrategyHiddenToVisible: (state, action) => {
            state.hiddenStrategies = state.hiddenStrategies.filter(s => s.strategyid !== action.payload.strategyid);
            state.strategies = [...state.strategies, action.payload]
        },
        deleteStrategy: (state, action) => {
            state.strategies = state.strategies.filter(e => e.strategyid !== action.payload);
        },
          

    },
})


export const { updateStrategies, moveStrategyVisibleToHidden, moveStrategyHiddenToVisible, addStrategy, deleteStrategy } = strategySlice.actions

export default strategySlice.reducer