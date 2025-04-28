const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connexion réussie à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion :', error);
    process.exit(1); // Quitte le processus si la connexion échoue
  }
};

module.exports = connectDB;
