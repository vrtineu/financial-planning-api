import mongoose from "mongoose";

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
        console.log(err);
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running."
        );
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnected", connect);
};
