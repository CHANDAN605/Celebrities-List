import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import Router from "./routes/route.js";

dotenv.config();
const PORT = 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`Server is running on : ${PORT} `));
// DefaultData();
