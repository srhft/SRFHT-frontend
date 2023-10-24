import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brokers: [],
}

export const brokerSlice = createSlice({
  name: 'broker',
  initialState,
  reducers: {
    addBroker: (state, action) => {
      const isBrokerExists = state.brokers.some((broker) => broker.broker.id ===  action.payload.broker.id);
      if (isBrokerExists) {
        return state;
      }
      state.brokers = [...state.brokers, action.payload]
    },
    deleteBroker: (state, action) => {
      console.log(action.payload)
      state.brokers = state.brokers.filter(b => b.broker.id !== action.payload)
    },
  },
})


export const { addBroker, deleteBroker } = brokerSlice.actions

export default brokerSlice.reducer