import mongoose from "mongoose";


const SubReqSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    product:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    rate:{
        type:Number,
        require:true
    },
   
});

const submitReq=new mongoose.model('submitReqest',SubReqSchema);

export default submitReq;