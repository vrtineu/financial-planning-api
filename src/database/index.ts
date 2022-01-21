import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const db = process.env.MONGO_URI!;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const connect = () => {
    mongoose
      .connect(db, options as ConnectOptions)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
        console.log(err);
        return mongoose.connection.on("error", (err) => {
          console.log(err);
          return connect();
        });
      });
  };
  connect();
  mongoose.connection.on("disconnected", connect);
};
