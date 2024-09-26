import express from 'express';
import { addStock, approvel, deleteApprovels, deleteIssueRequests, getApprovels, getIssueReq, getStock, getSubmitReq, issueNow, soldOut, submitNow } from '../controllers/adminController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const app = express();

app.post('/addstock',addStock);
app.get('/getstock',getStock);
app.get('/getissuereq',getIssueReq);
app.get('/getsubmitreq',getSubmitReq);
app.post('/issue',issueNow);
app.get('/deleteissuerequests/:username/:product',deleteIssueRequests);
app.post('/submit',submitNow);
app.get('/getapprovel',isAuthenticated,getApprovels);
app.post('/approvel/:username',approvel);
app.get('/deleteapprovel/:username',deleteApprovels);
app.get('/soldout',soldOut);

export default app;