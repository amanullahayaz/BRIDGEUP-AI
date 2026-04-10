const mongoose = require('mongoose');

async function connectToDB(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
    // ❌ REMOVE THIS
    // process.exit(1);

    // ✅ THROW INSTEAD
    throw error;
  }
}

module.exports = connectToDB;