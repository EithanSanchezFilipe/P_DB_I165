const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models').User;
const JWT_SECRET = require('../config/keys').JWT_SECRET;

// remove password from user object
const cleanUser = (user) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...cleanedUser } = user;
  return cleanedUser;
};

const AuthController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email })
      .then((result) => {
        if (result) {
          if (bcrypt.compareSync(password, result.password)) {
            const user = cleanUser(result);
            const token = jsonwebtoken.sign({}, JWT_SECRET, {
              subject: result.id.toString(),
              expiresIn: 60 * 60 * 24 * 30 * 6,
              algorithm: 'RS256'
            });
            return res.status(200).json({ user: user, token: token });
          } else {
            return res.status(400).json({
              message: 'Mauvais email ou mot de passe!'
            });
          }
        } else {
          return res.status(404).json({
            message: "Ce compte n'existe pas !"
          });
        }
      })
      .catch((error) => {
        console.error('LOGIN USER: ', error);
        return res.status(400).json(null);
      });
  }
};

module.exports = AuthController;
