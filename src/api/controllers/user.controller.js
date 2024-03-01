import User from "../models/User.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getAllUser =  async (req, res, next) => {
    try {
        const users = await User.find();
        return next(CreateSuccess(200, "Users Found", users))
    } catch (error) {
        return next(CreateError(500).send("Bad Gateway...!"));
    }
}

export const getUserByID =  async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return next(CreateError(404).send("User Not Found...!"));
        }
        return next(CreateSuccess(200, "User Found", user))
    } catch (error) {
        return next(CreateError(500).send("Bad Gateway...!"));
    }
}