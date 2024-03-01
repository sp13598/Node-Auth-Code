import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const register = async (req, res, next) => {
  try {
    const role = await Role.find({ role: "User" });
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      roles: role,
    });
    await newUser.save();
    return next(CreateSuccess(201, "User Registered Successfully...!"));
  } catch (error) {
    console.log(error);
    return res.status(500).send("Bad Gateway...!");
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    .populate("roles", "role");
    const { roles } = user;

    if (!user) {
      return next(CreateError(404, "User Not Found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Password Incorrect..!"));
    }
    //token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, roles: roles},
      process.env.JWT_SECRET
    )
    // return next(CreateSuccess(200, "Login Success.."));
    res.cookie("access_token", token, {httpOnly: true})
    .status(200)
    .json({
      status: 200,
      message: "Login Success!",
      data: user});
  } catch (error) {
    return res.status(500).send("Bad Gateway...!");
  }
};


export const registerAdmin = async(req, res, next) => {
  try {
    const role = await Role.find({ });
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      isAdmin: true,
      roles: role,
    });
    await newUser.save();
    return next(CreateSuccess(201, "Admin Registered Successfully...!"));
  } catch (error) {
    console.log(error);
    return res.status(500).send("Bad Gateway...!");
  }
}