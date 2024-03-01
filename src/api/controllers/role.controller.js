import Role from "../models/Role.js";
import {CreateSuccess} from "../utils/success.js";
import {CreateError} from "../utils/error.js"


export const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      return next(CreateSuccess(201, "Role Created Succesfully.."));
    } else {
      return next(CreateError(400, "Bad Reqest.."));
    }
  } catch (error) {
    return next(CreateError(500).send("Bad Gateway...!"));
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });
    if (role) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return next(CreateSuccess(200, "Role Updated Successfully..", newData));
    } else {
      return next(CreateError(404, "Role Not Found..!"));
    }
  } catch (error) {
    return next(CreateError(500).send("Bad Gateway...!"));
  }
};

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    return next(CreateSuccess(200, "Roles Found", roles));
  } catch (error) {
    return next(CreateError(500).send("Bad Gateway...!"));
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await Role.findById({ _id: id });
    if (role) {
      await Role.findByIdAndDelete(id);
      return next(CreateSuccess(200, "Role Deleted.."));
    } else {
      return next(CreateError(404, "Role Not Found..!"));
    }
  } catch (error) {
    return next(CreateError(500).send("Bad Gateway...!"));
  }
};
