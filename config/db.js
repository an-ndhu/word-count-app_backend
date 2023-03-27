const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("Mongoose Connection Failed");
  }
};
module.exports = connectDB;
