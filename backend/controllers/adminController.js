import issuedItems from "../models/issuedItems.js";
import issueReq from "../models/issueReq.js";
import mainStock from "../models/mainStock.js";
import submitReq from "../models/submitReq.js";
import User from "../models/User.js";
import UserReq from "../models/userReq.js";


export const addStock = async (req, res) => {
    try {
        const { product, quantity, rate } = req.body;
        if (!product || !quantity || !rate) {
            return res.status(401).json({
                success: false,
                message: 'Something is missing,Please cheack!'
            });
        }
        const ifExist = await mainStock.findOne({ product });
        if (ifExist) {
            const as = await mainStock.findByIdAndUpdate(ifExist._id, { product, quantity: quantity + ifExist.quantity, rate });
            return res.status(200).json({
                success: true,
                message: 'Added to main Stock Successfully!'
            });
        }
        else {
            const is = await mainStock({ product, quantity, rate });
            const ss = await is.save();
            return res.status(200).json({
                success: true,
                message: 'Inserted to main Stock Successfully!'
            });
        }
    } catch (error) {
        console.log("error while adding Stock ", error);
    }
}

export const getStock = async (req, res) => {
    try {
        const allStock = await mainStock.find();
        if (!allStock) {
            return res.json({
                message: 'No Stock Available!'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'stock geted',
                allStock
            })
        }
    } catch (error) {
        console.log("error while getting Stock", error);
    }
}

export const getIssueReq = async (req, res) => {
    try {
        const req = await issueReq.find();
        return res.status(200).json({
            success: true,
            req
        })
    } catch (error) {
        console.log("error while get issue requests", error);
    }
}

export const getSubmitReq = async (req, res) => {
    try {
        const req = await submitReq.find();
        return res.status(200).json({
            success: true,
            req
        })
    } catch (error) {
        console.log("error while get submit requests", error);
    }
}

export const issueNow = async (req, res) => {
    try {
        const item = await issueReq.findOneAndDelete({ username: req.body.username, product: req.body.product });
        if (!item) {
            return res.json({
                message: `No Request Available with ${req.body.username}`
            });
        }
        const isProduct = await mainStock.findOne({ product: req.body.product });
        if (!isProduct) {
            return res.json({
                message: `${req.body.product} is out of stock`
            });
        }
        if (item.quantity > isProduct.quantity) {
            return res.json({
                message: `Quantity not Available!`
            });
        }
        const ifExist = await issuedItems.findOne({ username: req.body.username, product: req.body.product });
        if (ifExist) {
            await issuedItems.findByIdAndUpdate(ifExist._id, { quantity: ifExist.quantity + item.quantity });
        }
        else {
            const issue = await issuedItems({
                username: item.username,
                product: item.product,
                quantity: item.quantity,
                rate: item.rate,
                type: item.type
            });
            await issue.save();

        }
        await mainStock.findByIdAndUpdate(isProduct._id, { quantity: isProduct.quantity - item.quantity });
        return res.status(200).json({
            message: `Request Accepted`,
            success: true,
        });
    } catch (error) {
        console.log("while issue item", error);
    }
}

export const deleteIssueRequests=async(req,res)=>{
    try {
        await issueReq.deleteOne({username:req.params.username,product:req.params.product});
        return res.status(200).json({
            success:true,
            message:'Request Deleted'
        })
    } catch (error) {
        console.log('while delete issue Requests',error);
    }
}

export const submitNow = async (req, res) => {
    try {
        const srfu = await submitReq.findOneAndDelete({ username: req.body.username, product: req.body.product });
        const item = await issuedItems.findOne({ username: req.body.username, product: req.body.product });
        const pims = await mainStock.findOne({ product: req.body.product });
        if (!srfu) {
            return res.json({
                message: `No Request Available with ${req.body.username}`
            });
        }
        if (pims) {
            await mainStock.findByIdAndUpdate(pims._id, { quantity: pims.quantity + srfu.quantity });

        }
        else {
            const sms = await mainStock({ product: srfu.product, quantity: srfu.quantity, rate: srfu.rate });
            await sms.save();
        }

        if (srfu.quantity < item.quantity) {
            await issuedItems.findByIdAndUpdate(item._id, { quantity: item.quantity - srfu.quantity })
        }
        else {
            await issuedItems.findByIdAndDelete(item._id);
        }
        return res.status(200).json({
            success:true,
            message:'request accepted'
        })
    } catch (error) {
        console.log("while submiting item", error);
    }
}

export const approvel=async(req,res)=>{
    try {
        const username=req.params.username;
        const account=await UserReq.findOneAndDelete({username});
        if(!account)
        {
            return res.status(401).json({
                success:false,
                message:`No Request with ${username}`
            })
        }
        const siu=await User({
            username:account.username,
            email:account.email,
            mobile:account.mobile,
            password:account.password,
            image:account.image
        })
        await siu.save();
        return res.status(200).json({
            success:true,
            message:'User Registered Successfully'
        })
    } catch (error) {
        console.log("while giving approvel",error);
    }
}

export const soldOut=async (req,res)=>{
    try {
        const soi=await issuedItems.find({type:'non-returnable'});
        return res.status(200).json({
            success:true,
            soi
        })
    } catch (error) {
        console.log("while geting sold out items",error);
    }
}

export const getApprovels=async(req,res)=>{
    try {
        const ua=await UserReq.find();
        return res.status(200).json({
            success:true,
            ua
        })
    } catch (error) {
        console.log("while get Approvels",error);
    }
}

export const deleteApprovels=async(req,res)=>{
    try {
        await UserReq.deleteOne({username:req.params.username});
        return res.status(200).json({
            success:true,
            message:'Request Deleted'
        })
    } catch (error) {
        console.log('while delete approvel',error);
    }
}