import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        openSignIn:false,
        openSignUp:false,
        userType:'',
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setOpenSignIn:(state,action)=>{
            state.openSignIn=action.payload;
        },
        setOpenSignUp:(state,action)=>{
            state.openSignUp=action.payload;
        },
        setUserType:(state,action)=>{
            state.userType=action.payload;
        },
    }

});

export const {setUser,setOpenSignIn,setOpenSignUp,setUserType}=userSlice.actions;
export default userSlice.reducer;