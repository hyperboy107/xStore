import { isValidObjectId } from "mongoose";
function checkID(req, res, next){
    if(!isValidObjectId(req.params.id)){
        res.status(404)
        throw new Error(`Invalid object: ${req.params.id}`)
    }
    next()
}

export default checkID;