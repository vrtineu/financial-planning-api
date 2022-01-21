import dotenv from "dotenv";
import express, { Application } from "express";
import routes from "./routes";

dotenv.config();
const port = process.env.PORT;
if (!port) throw new Error("Configurar .env");

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export default app;
