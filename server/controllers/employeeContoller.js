import { StatusCodes } from "http-status-codes";
import { employeeModel } from "../models/employee.js";
import { createError } from "../config/errors.js";
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST } =
  StatusCodes;

export const addEmployee = async (req, res, next) => {
  const { name, email, jobTitle, phone, image } = req.body;
  if (!name || !email || !jobTitle || !phone || !image)
    return next(
      createError(
        BAD_REQUEST,
        `oopss! name:${name} or email:${email} or jobTitle:${jobTitle} or phone:${phone} or image:${image}  is missing`
      )
    );
  try {
    const employee = await employeeModel.create(req.body);
    if (!employee) return next(createError(NOT_FOUND, "ooopss! error occured"));

    return res.status(OK).json(employee);
  } catch (error) {
    return next(createError(INTERNAL_SERVER_ERROR, error.message));
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeModel.find({});
    if (!employees || employees.length < 1)
      return next(createError(NOT_FOUND, "error occured!!"));

    return res.status(OK).json( employees );
  } catch (error) {
    next(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getEmployee = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(BAD_REQUEST, "oopss! id is missing"));
  try {
    const employee = await employeeModel.findById(id);
    if (!employee) return next(createError(NOT_FOUND, "oopss!! error occured"));

    return res.status(OK).json(employee);
  } catch (error) {
    next(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const UpdateEmployee = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(BAD_REQUEST, "oopss! userID is missing"));
 
  try {
    // console.log(req.body)
    const employee = await employeeModel.findByIdAndUpdate(id, req.body, {new: true})
    if (!employee) return next(createError(NOT_FOUND, "ooopss! error occured"));

    return res.status(OK).json(employee);
  } catch (error) {
    return next(createError(INTERNAL_SERVER_ERROR, error.message));
  }
};

export const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(BAD_REQUEST, "oopss! userID is missing"));

  try {
    const employee = await employeeModel.findByIdAndDelete(id);
    if (!employee) return next(createError(NOT_FOUND, "ooopss! error occured"));

    return res.status(OK).json(employee);
  } catch (error) {
    return next(createError(INTERNAL_SERVER_ERROR, error.message));
  }
};
