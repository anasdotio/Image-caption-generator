const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connect to db successfully ✅`);
  } catch (err) {
    console.error("Error occur while trying to connect db");
    process.exit(1);
  }
};

module.exports = connectToDB;
