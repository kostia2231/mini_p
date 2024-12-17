import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Document, CallbackWithoutResultAndOptionalError } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUser>(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    const user = this;
    if (!user.isModified("password")) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.error("Error while hashing password:", (err as Error).message);
      next(err as Error);
    }
  },
);

userSchema.methods.isCorrectPassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
