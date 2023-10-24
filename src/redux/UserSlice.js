import { createSlice } from '@reduxjs/toolkit'
const user = localStorage.getItem('routes') && JSON.parse(localStorage.getItem('routes'))?.data?.result
const initialState = {
    info: user,
    userInfo: user?.profile[0] || null
};
  

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoginUser: (state, action) => {
            state.info = action.payload;
            state.userInfo = action.payload.result.profile[0]
        },
        LogoutUser: (state) => {
            state.info = null
            state.userInfo = null
            localStorage.clear()
        },
    },
})


export const { LoginUser, LogoutUser } = userSlice.actions

export default userSlice.reducer