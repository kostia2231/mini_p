import User from "../models/User";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "user already exist with these creds" });
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "user created" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "server error register", error: (e as Error).message });
  }
};

export const loginUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user does not exist with these creds" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "wrong creds" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (e) {
    res.status(500).json({
      message: "server error while login",
      error: (e as Error).message,
    });
  }
};
