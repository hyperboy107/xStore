import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authhenticate = asyncHandler(async (req, res, next)=>{
    let token;
    //Read jwt token grom jwt cokkie
    token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("not authorized, token is not found");
    }
})

//For the checking the admin
const authorizedAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized admin");
    }
}

export {authhenticate, authorizedAdmin};