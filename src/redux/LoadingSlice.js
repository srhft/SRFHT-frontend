import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    title: null,
    desc: null,
    cta: null,
    requestSource: null
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => ({ 
        ...state, 
        isLoading: true, 
        title: action.payload?.title || "Loading",
        desc: action.payload?.desc || "Request Processing....",
        cta: action.payload?.cta || "Cancel",
        requestSource: action.payload?.requestSource || null
      }),  
    stopLoading: (state) => ({ ...state, isLoading: false })  
  },
})


export const { startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer