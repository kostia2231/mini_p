import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { RegisterBody, LoginBody } from "../types/auth";
import { APIResponse } from "../types/common";
import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY;

export const registerUser: RequestHandler = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response<APIResponse>,
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "user already exists with these creds",
        success: false,
      });
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "user created", success: true });
  } catch (e) {
    res.status(500).json({
      message: "server error register",
      error: (e as Error).message,
      success: false,
    });
  }
};

export const loginUser: RequestHandler = async (
  req: Request<{}, {}, LoginBody>,
  res: Response<APIResponse>,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "email and password are required", success: false });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "user does not exist with these creds",
        success: false,
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "wrong creds", success: false });
      return;
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY!, {
      expiresIn: "1h",
    });
    res.json({ message: "token: ", token, success: true });
  } catch (e) {
    res.status(500).json({
      message: "server error while login",
      error: (e as Error).message,
      success: false,
    });
  }
};
