import mongoose from "mongoose";


const IssueReqSchema=mongoose.Schema({
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
    type:{
        type:String,
        require:true,
        enum:["returnable","non-returnable"]
    }
});

const issueReq=new mongoose.model('issueReqest',IssueReqSchema);

export default issueReq;