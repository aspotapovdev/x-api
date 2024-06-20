const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { MONGO_DB, MONGO_USER, MONGO_PASSWORD, MONGO_HOST } = process.env;

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?authSource=admin`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose.connection;
