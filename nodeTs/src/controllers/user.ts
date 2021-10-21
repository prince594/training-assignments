import { Request, Response, NextFunction } from "express";
import userServices from "../services/user";
import jwt from "jsonwebtoken";
import config from "../config/config";
import authSchema from "../helper/authSchema";

const signToken = (id: any) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
/* POST, new User */
const signup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const results = await authSchema.userSchema.validate(req.body);
    const resData: any = await userServices.postUser(results);
    const token = signToken(resData._id);
    return res.send({
      data: {
        status: "Success",
        token,
        user: resData,
      },
    });
  } catch (error: any) {
    res.send(error);
  }
};
/* POST, existing User with 'email & password' */
const login = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(console.log("Please provide email and password"));
      res.send({ message: "Please provide email and password" });
    }
    const userData: any = await userServices.getUserByEmail(email);
    if (!userData) {
      next(console.log("Invalid user"));
      res.send({ message: "Please provide valid user credential" });
    }
    const token = signToken(userData._id);
    res.send({
      status: "Success",
      token,
    });
  } catch (error: any) {
    res.send(error);
  }
};
/* GET, All User */
const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userData: any = await userServices.showUsers();
    res.send({ count: userData.length, users: userData });
  } catch (error: any) {
    res.send({ error });
  }
};
export default { signup, login, getUsers };

/* This is a sample token, for testing */
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmQ0YzA1NmMzNjU4NDFmODA2YmMyOCIsImlhdCI6MTYzNDU1MjgzNywiZXhwIjoxNjQyMzI4ODM3fQ.yzbQLMgh3MJ1QzGGzC6Qr-WYwhC9-VtkEIVoPUtD2TU
