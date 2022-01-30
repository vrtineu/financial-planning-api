import bodyParser from "body-parser";
import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

export default app;
