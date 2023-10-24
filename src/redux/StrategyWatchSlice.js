import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    strategies: []
  };
  

export const strategyWatchSlice = createSlice({
    name: 'strategyWatch',
    initialState,
    reducers: {
        addstrategyWatch: (state, action) => {
            if (Array.isArray(action.payload)) state.strategies = action.payload;
            else state.strategies = [...state.strategies, action.payload]    
          },
        updatestrategyWatch: (state, action) => {
            state.strategies.forEach((s, index) => {
                if(s.id === action.payload.id){
                    state.strategies[index] = action.payload
                }
            })
        },
        deletestrategyWatch: (state, action) => {
            state.strategies = state.strategies.filter(e => e.id !== action.payload);
        },
          

    },
})


export const { updatestrategyWatch, addstrategyWatch, deletestrategyWatch } = strategyWatchSlice.actions

export default strategyWatchSlice.reducer