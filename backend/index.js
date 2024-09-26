import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
import dbConnect from './utills/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authApp from './routes/authRoutes.js'
import { getProfilePic } from './middlewares/upload.js';
import adminApp from './routes/adminRoutes.js';
import userApp from './routes/userRoutes.js';
import path from 'path';

const app=express();
dotenv.config();

dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
    origin:"https://r-n-t-store.onrender.com",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}
app.use(cors(corsOptions));


//api
app.get('/file/:filename',getProfilePic);
app.use('/auth',authApp);
app.use('/admin',adminApp);
app.use('/user',userApp);

const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
});

app.listen(8000,()=>{
    console.log(`backend running on port 8000`);
})