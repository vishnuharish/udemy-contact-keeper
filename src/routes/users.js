const express = require('express');

const router = express.Router();

// @route   POST /api/users
// @desc    Register the user
// @access  Public

router.post('/', (req, res) => {
	res.send('User registrations');
});

module.exports = router;
