import mongoose from "mongoose";


const StockSchema=mongoose.Schema({
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
    }
});

const mainStock=new mongoose.model('mainStock',StockSchema);

export default mainStock;