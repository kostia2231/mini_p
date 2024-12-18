import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import taskRouter from "./routes/task";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI || "nothing";
// console.log("this is uri: ", MONGO_URI);
const PORT = process.env.PORT || 7331;

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("db is connected");
  })
  .catch((e) => {
    console.error("error whiel connecting db: ", (e as Error).message);
  });

app.get("/", (_req, res) => {
  res.send("this is hello from server :]");
});

app.listen(PORT, () => {
  console.log(`server is running on http//:localhost:${PORT}`);
});
