import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isClosed: true,
  status: false, //intentionallly colosed 
  connection: null,
};

export const SocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    SocketConnect: (state, action) => {
      state.isClosed = false;
      state.status = true;
      state.connection = action.payload;
    },
    SocketDisconnect: (state) => {
      state.isClosed = true
      state.status = false;
      state.connection?.close();
      state.connection = null;
    },
    Socketclose: (state) => {
      state.isClosed = true;
    }
  },
});

export const { SocketConnect, SocketDisconnect, Socketclose } = SocketSlice.actions;

export default SocketSlice.reducer;
