import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface reqUser extends Request {
  user?: any;
}

const authenticateToken = (req: reqUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }
  const secret = process.env.JWT_SECRET as string;

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      req.user = null;
    } else {
      req.user = user;
    }
    next();
  });
};

export default authenticateToken;
