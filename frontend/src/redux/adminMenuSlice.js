import {createSlice} from '@reduxjs/toolkit'

const adminMenuSlice=createSlice({
    name:'adminMenu',
    initialState:{
        addStock:false,
        issue:false,
        submit:false,
        approvel:false,
        soldOut:false,
    },
    reducers:{
        setAddStock:(state,actions)=>{
            state.addStock=actions.payload;
        },
        setIssue:(state,actions)=>{
            state.issue=actions.payload;
        },
        setSubmit:(state,actions)=>{
            state.submit=actions.payload;
        },
        setApprovel:(state,actions)=>{
            state.approvel=actions.payload;
        },
        setSoldOut:(state,actions)=>{
            state.soldOut=actions.payload;
        },
    }

});

export const {setAddStock,setIssue,setSubmit,setApprovel,setSoldOut}=adminMenuSlice.actions;
export default adminMenuSlice.reducer;