const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || '3000';
const env = process.env.NODE_ENV || 'development';
const db = require('./config/mongoose');
const connectDB = require('./routes');

const initApp = async () => {
  try {
    await db.authenticate();
    console.log('La connexion a la base de données été établie avec succès.');

    // Serve the frontend static files
    app.use(express.static('../dist'));

    app.use(express.json());
    app.use(cookieParser());

    // API routes
    app.use(router);

    // Serve the frontend index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    // Start the web server on the specified port.
    app.listen(port, () => {
      console.info(
        `🚀🚀 Le serveur est démarré sur le port ${port} et avec l’environnement: ${env} 🚀🚀`
      );
    });
  } catch (error) {
    console.error('Impossible de se connecter à la base de données', error);
  }
};

initApp();
