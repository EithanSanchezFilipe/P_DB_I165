const fs = require('fs');

module.exports = {
  JWT_SECRET: fs.readFileSync('./config/keys/jwtRS256.key'),
  JWT_PUBLIC: fs.readFileSync('./config/keys/jwtRS256.key.pub')
};
