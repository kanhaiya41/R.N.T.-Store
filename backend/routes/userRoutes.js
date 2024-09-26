import express from 'express'
import { findIssueReq, findSubmitReq, issueReqest, submitReqest, userItems } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const app = express();

app.get('/useritems/:username',isAuthenticated,userItems);
app.post('/issuereqest',issueReqest);
app.post('/submitreqest',submitReqest);
app.get('/findissuereqest/:username',findIssueReq);
app.get('/findsubmitreqest/:username',findSubmitReq);

export default app;