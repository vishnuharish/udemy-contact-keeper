const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/User.js');

// @route   GET /api/auth
// @desc    Get the Logged in user
// @access  Private

router.get('/', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json({ user });
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

// @route  POST /api/auth
// @desc   User login and get the access token
// @access Public

router.post(
	'/',
	[
		check('email', 'Please enter the valid email').isEmail(),
		check('password', 'Please enter password').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ login: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ login: 'Invalid Credentials' }] });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
