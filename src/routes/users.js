const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../models/User.js');

// @route   POST /api/users
// @desc    Register the user
// @access  Public

router.post(
	'/',
	[
		check('name', 'Please add a name')
			.not()
			.isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check(
			'password',
			'Please Enter the password of minimum 6 or more characters'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { name, email, password } = req.body;
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ user: 'User already exist' }] });
			}

			user = new User({ name, password, email });

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

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
		} catch (error) {
			console.log(error);
			res.send('Server Error');
		}
	}
);

module.exports = router;
