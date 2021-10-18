import express from "express";
import ping from "./routes/ping";

require("babel-core/register");
require("babel-polyfill");

const app = express();

app.use(ping);

export default app;