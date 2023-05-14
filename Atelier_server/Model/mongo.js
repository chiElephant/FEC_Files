require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PSWD, MONGO_URI, MONGO_PORT, MONGO_NAME } =
  process.env;

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PSWD}@${MONGO_URI}:${MONGO_PORT}/${MONGO_NAME}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.log(error));

module.exports = db;
