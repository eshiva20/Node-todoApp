import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then((c) => {
      console.log(`Db Connected Succesfully with ${c.connection.host}`);
    })
    .catch((err) => console.log("error", err));
};

export default connectDB;
