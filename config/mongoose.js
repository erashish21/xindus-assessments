const mongoose = require("mongoose");

require("dotenv").config();


const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(
    "MongoDB URI is not defined. Please set the MONGO_URI environment variable."
  );
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection events
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${MONGO_URI}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Graceful shutdown
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});
