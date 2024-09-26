import {createSlice} from '@reduxjs/toolkit'

const userMenuSlice=createSlice({
    name:'userMenu',
    initialState:{
        allItems:false,
        myItems:false,
        issueRequest:false,
        submitRequest:false,
        requests:false,
    },
    reducers:{
        setAllItems:(state,actions)=>{
            state.allItems=actions.payload;
        },
        setMyItems:(state,actions)=>{
            state.myItems=actions.payload;
        },
        setIssueRequest:(state,actions)=>{
            state.issueRequest=actions.payload;
        },
        setSubmitRequest:(state,actions)=>{
            state.submitRequest=actions.payload;
        },
        setRequests:(state,actions)=>{
            state.requests=actions.payload;
        },
    }

});

export const {setAllItems,setMyItems,setIssueRequest,setSubmitRequest,setRequests}=userMenuSlice.actions;
export default userMenuSlice.reducer;