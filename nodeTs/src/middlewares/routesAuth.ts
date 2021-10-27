import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import constants from "../config/constants";

const protect = (req: any, res: Response, next: NextFunction) => {
  // Receiving Token
  try {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.send({
        message: constants.loginError,
      });
    }
    // Verification of token
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        return res.send({
          err,
          message: constants.verifyError,
        });
      } else {
        console.log(user);
      }
    });
    next();
  } catch {
    (err: any) => {
      res.send(err);
    };
  }
};

export default { protect };
