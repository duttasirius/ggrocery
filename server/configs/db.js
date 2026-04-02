import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DATABASE CONNECTED"),
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/groceryy`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
