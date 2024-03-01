import jwt from "jsonwebtoken";
import { CreateError } from "./error.js"
import { CreateSuccess } from './success.js'



export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(CreateError(401, "Not Authorized...!"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err){
            return next(CreateError(403, "Invalid Token..!"));
        }
        req.user = user;
        next()
    })
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin)
            next();
        else    
            return next(CreateError(403, "Not Authorized...!"));
    })
} 

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin)
            next();
        else    
            return next(CreateError(403, "Not Authorized...!"));
    })
} 