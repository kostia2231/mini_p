import express from "express";
import mongoose from "mongoose";
import router from "./routes/auth";

const MONGO_URI = process.env.MONGO_URI || "nothing";
const PORT = process.env.PORT || 7331;

const app = express();
app.use(express.json());
app.use("/api/auth", router);

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("db is connected");
  })
  .catch((e) => {
    console.error("error whiel connecting db: ", (e as Error).message);
  });

app.get("/", (_req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`server is running on http//:localhost:${PORT}`);
});
