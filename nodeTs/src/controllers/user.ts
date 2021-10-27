import { Request, Response } from "express";
import userServices from "../services/user";
import jwt from "jsonwebtoken";
import config from "../config/config";
import helper from "../helper/user";
import constants from "../config/constants";

const signToken = (id: any) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
/* POST, new User */
const signup = async (req: any, res: Response) => {
  try {
    const results = await helper.userSchema.validate(req.body);
    const resData: any = await userServices.postUser(results);
    const token = signToken(resData._id);
    return res.send({
        data: {
          status: "Success",
          token,
          user: resData,
        },
      })
  } catch (error: any) {
    res.send(error);
  }
};
/* POST, existing User with 'email & password' */
const login = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send({ message: constants.noCredentialError });
    }
    const userData: any = await userServices.getUserByEmail(email);
    if (!userData) {
      res.send({ message: constants.invalidCredentialError });
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
const getUsers = async (req: any, res: Response) => {
  try {
    const userData: any = await userServices.showUsers();
    res.send({ count: userData.length, users: userData });
  } catch (error: any) {
    res.send({ error });
  }
};
export default { signup, login, getUsers };

