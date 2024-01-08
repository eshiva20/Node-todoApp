import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then(() => {
      console.log("Db Connected Succesfully");
    })
    .catch((err) => console.log("error", err));
};

export default connectDB;
