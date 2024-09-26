import mongoose from "mongoose";


const UserShema=mongoose.Schema({
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

const User=new mongoose.model('user',UserShema);

export default User;