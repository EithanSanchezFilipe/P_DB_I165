const bcrypt = require('bcrypt');
const User = require('../models').User;
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = require('../config/keys').JWT_SECRET;
const redisClient = require('../index');

const cleanUser = (user) => {
  // eslint-disable-next-line no-unused-vars
  const { pasword, ...cleanedUser } = user;
  return cleanedUser;
};

const UserController = {
  createUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const savedUser = User.create({
        email: email.toLowerCase(),
        password: hashedPassword
      });

      const token = jsonwebtoken.sign({}, JWT_SECRET, {
        subject: (await savedUser)._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256'
      });

      return res.status(201).json({
        user: cleanUser(savedUser),
        token
      });
    } catch (error) {
      console.error('ADD USER: ', error);
      return res.status(500).json({
        message: 'Erreur lors de la création du compte.'
      });
    }
  },
  getUser: async (req, res) => {
    const user_id = req.sub;
    if (userSession) {
      return res.status(200).json(userSession);
    } else {
      await User.findOne({
        _id: user_id
      })
        .select('-id -password')
        .then(async (result) => {
          if (result) {
            await redisClient.hSet(`user:${user_id}`, {
              email: result.email,
              name: result.name,
              address: result.address,
              zip: result.zip,
              location: result.location
            });
            return res.status(200).json(result);
          } else {
            return res.status(404);
          }
        })
        .catch((error) => {
          console.error('GET USER: ', error);
          return res.status(500);
        });
    }
  },
  editUser: async (req, res) => {
    const user_id = req.sub;
    const query = { _id: user_id };
    const data = req.body;
    User.findOne(query)
      .select('-password')
      .then((user) => {
        user.name = data.name ? data.name : null;
        user.address = data.address ? data.address : null;
        user.zip = data.zip ? data.zip : null;
        user.location = data.location ? data.location : null;
        user
          .save()
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((error) => {
            console.error('UPDATE USER: ', error);
            return res.status(500);
          });
      })
      .catch((error) => {
        console.error('GET USER: ', error);
        return res.status(500);
      });
    return res.status(404);
  },
  deleteCurrentUser: (req, res) => {
    const user_id = req.sub;
    const query = { _id: user_id };
    console.log('DELETE USER: ', query);
    User.deleteOne(query)
      .then(() => {
        return res.status(200).json({ id: user_id });
      })
      .catch((error) => {
        console.error('DELETE USER: ', error);
        return res.status(500);
      });
  }
};

module.exports = UserController;
