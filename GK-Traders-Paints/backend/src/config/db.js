const dns = require('dns');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gk_traders_paints';
    if (mongoURI.startsWith('mongodb+srv://')) {
      // Use public DNS resolvers so SRV lookups succeed even if local DNS blocks them
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    }
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(` MongoDB Connection Warning: ${error.message}`);
    console.log(' Note: Ensure MongoDB is running locally on 127.0.0.1:27017 or set MONGODB_URI.');
  }
};

module.exports = connectDB;
