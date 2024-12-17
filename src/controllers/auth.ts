import User from "../models/User";
import { RequestHandler } from "express";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      // return?error
      res.status(400).json({ message: "user exists with this email" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "user created" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "server error", error: (e as Error).message });
  }
};
