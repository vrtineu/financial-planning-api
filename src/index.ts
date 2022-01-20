import express, { Application } from 'express';
import dotenv from "dotenv";
import connect from "./database/index";

dotenv.config();
const { MONGO_URI, PORT } = process.env;

const app: Application = express();
connect(typeof MONGO_URI === "string" ? MONGO_URI : process.exit(1));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

export default app;
