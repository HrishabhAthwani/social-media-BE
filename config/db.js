const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the connection string
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    }).then(()=>{
      console.log('MongoDB connected successfully');
    })
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;