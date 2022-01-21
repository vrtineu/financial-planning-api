import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connect() {
  const db = process.env.MONGO_URI;
  if (!db) throw new Error("Configurar .env");

  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const connect = () => {
    mongoose.connect(db, options as ConnectOptions).catch((err) => {
      console.log(err);
      return mongoose.connection.on("error", (err) => {
        console.log(err);
        return connect();
      });
    });
  };
  connect();
  mongoose.connection.on("disconnected", connect);
}

export { connect };
