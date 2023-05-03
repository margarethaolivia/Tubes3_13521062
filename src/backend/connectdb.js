const mongoose = require("mongoose");

const connectToDatabase = async () => {
  mongoose
    .connect(
      "mongodb+srv://chatDOA:sudahlelah@chatdoa.e50bxgy.mongodb.net/chatDOA?retryWrites=true&w=majority"
    )
    .then((x) => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
    });
};

const disconnectFromDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB!");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};

module.exports = { connectToDatabase, disconnectFromDatabase };
