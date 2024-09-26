import issuedItems from "../models/issuedItems.js";
import issueReq from "../models/issueReq.js";
import mainStock from "../models/mainStock.js";
import submitReq from "../models/submitReq.js";


export const userItems = async (req, res) => {
    try {
        const {username}=req.params;
        const ui = await issuedItems.find({username});
        if (!ui) {
            return res.json({
                message: `User havn't any item`
            });

        }
        else {
            return res.status(200).json({
                success: true,
                message: 'User Items geted successfully',
                ui
            })
        }
    } catch (error) {
        console.log("error while getting User Items", error);
    }
}

export const issueReqest = async (req, res) => {
    try {
        const ifExist = await issueReq.findOne({ username: req.body.username, product: req.body.product });
        const exited = await mainStock.findOne({ product: req.body.product });

        if (!exited) {
            return res.json({
                
                message: 'This item is not available!'
            })
        }
        if (req.body.quantity > exited.quantity) {
            return res.json({
                message: 'Quantity is too high!'
            })
        }
        if (ifExist) {
            return res.json({
                message: 'Already Requested'
            });
        }
        else {
            const isr = issueReq(req.body);
            const reqis = await isr.save();

            return res.status(200).json({
                success: true,
                message: 'Request Successfully'

            })
        }


    } catch (error) {
        console.log("error while issue Request", error);
    }
}

export const submitReqest = async (req, res) => {
    try {
        const item = await issuedItems.findOne({ username: req.body.username, product: req.body.product });
        if (!item) {
            return res.json({
                message: `No Request Available with ${req.body.username}`
            });
        }

        if (item.quantity < req.body.quantity) {
            return res.json({
                message: `Quantity not Available i your stock!`
            });
        }
        const ifExist = await submitReq.findOne({ username: req.body.username, product: req.body.product });
        if (ifExist) {
            await submitReq.findByIdAndUpdate(ifExist._id, { quantity: ifExist.quantity + req.body.quantity });

        }
        else {
            const issue = await submitReq({
                username: req.body.username,
                product: req.body.product,
                quantity: req.body.quantity,
                rate: req.body.rate

            });
            await issue.save();

        }
        
        return res.status(200).json({
            message: `Request sent`,
            success: true,
        });
    } catch (error) {
        console.log("while reqest submit item", error);
    }
}

export const findIssueReq=async(req,res)=>{
    try {
        const issuereqests=await issueReq.find({username:req.params.username});
        return res.status(200).json({
            success:true,
            issuereqests
        });
    } catch (error) {
        console.log("error while geting issue request",error);
    }
}

export const findSubmitReq=async(req,res)=>{
    try {
        const issuereqests=await submitReq.find({username:req.params.username});
        return res.status(200).json({
            success:true,
            issuereqests
        });
    } catch (error) {
        console.log("error while geting submit request",error);
    }
}