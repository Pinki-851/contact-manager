const mongoose = require("mongoose");

const connectDB = async () => {
  // console.log("connect");
  try {
    // console.log("try", process.env.MONGO_URL);
    const connect = await mongoose.connect(process.env.MONGO_URL);
    // console.log("after try");
    console.log("connect", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};

module.exports = connectDB;
