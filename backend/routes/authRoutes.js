import express from 'express';
import { upload, uploadToGridFs } from '../middlewares/upload.js';
import { editProfile, Login, logout, sendMail, SginInUser } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';


const app=express();
app.post('/signin',upload.single('image'),uploadToGridFs,SginInUser);
app.post('/login',Login);
app.get('/logout',logout);
app.post('/editprofile',isAuthenticated,upload.single('image'),uploadToGridFs,editProfile);
app.post('/gmail/:email/:code',sendMail);


export default app;