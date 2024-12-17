"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
require("dotenv/config");
const MONGO_URI = process.env.MONGO_URI || "nothing";
// console.log("this is uri: ", MONGO_URI);
const PORT = process.env.PORT || 7331;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
mongoose_1.default
    .connect(MONGO_URI, {})
    .then(() => {
    console.log("db is connected");
})
    .catch((e) => {
    console.error("error whiel connecting db: ", e.message);
});
app.get("/", (_req, res) => {
    res.send("hello");
});
app.listen(PORT, () => {
    console.log(`server is running on http//:localhost:${PORT}`);
});
