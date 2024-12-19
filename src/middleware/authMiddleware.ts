import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY;

interface JWTPayload {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "token is required", success: false });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY!) as JWTPayload;
    req.user = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ message: "invalid token", success: false });
  }
};
