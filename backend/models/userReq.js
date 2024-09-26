import mongoose from "mongoose";


const UserReqShema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
});

const UserReq=new mongoose.model('userRequest',UserReqShema);

export default UserReq;