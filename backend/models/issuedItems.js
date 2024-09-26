import mongoose from "mongoose";


const IssuedItemsSchema=mongoose.Schema({
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

const issuedItems=new mongoose.model('issuedItems',IssuedItemsSchema);

export default issuedItems;