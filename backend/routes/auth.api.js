const router = require('express').Router();
const { loginUser } = require('../controllers').AuthController;

// Handle the API request
router.post('/', loginUser);

module.exports = router;
