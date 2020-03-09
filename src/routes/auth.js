const express = require('express');

const router = express.Router();

// @route   GET /api/auth
// @desc    Get the Logged in user
// @access  Private

router.get('/', (req, res) => {
	res.send('Logged user info');
});

// @route  POST /api/auth
// @desc   User login and get the access token
// @access Public

router.post('/', (req, res) => {
	res.send('Login user');
});

module.exports = router;
