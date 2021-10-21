import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

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
        message: "You are not loggedin! Please login to get access",
      });
    }
    // Verification of token
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        return res.send({
          err,
          message: "Access Denied! Unauthorized User",
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
