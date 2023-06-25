import { createSlice } from "@reduxjs/toolkit";

//Slice는 작은 store 같은 개념
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isLoggedIn:false,
        user:null,
        nickname : null
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.nickname = action.payload.nickname;
        },
        logoutSuccess:(state,action)=>{
            state.isLoggedIn = false;
            state.user = null;
            state.nickname =null;
        },

    }
})

export default authSlice.reducer;
export const {loginSuccess,logoutSuccess} = authSlice.actions;