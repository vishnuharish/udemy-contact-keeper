const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const authMiddleware = require('../middlewares/auth');
// @route   GET /api/contacts
// @desc    Get all user's contacts
// @access  Private

router.get('/', authMiddleware, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1
		});
		res.json({ contacts });
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

// @route   POST /api/contacts
// @desc    Create user's contacts
// @access  Private

router.post(
	'/',
	[
		authMiddleware,
		[
			check('name', 'Please enter the name of the contact')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, phone, type } = req.body;
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id
			});
			const contact = await newContact.save();
			res.json({ contact });
		} catch (err) {
			console.log(err);
			res.status(500).send('Server Error');
		}
	}
);

// @route   PUT /api/contacts/:id
// @desc    Update user's single contact
// @access  Private

router.put('/:id', authMiddleware, async (req, res) => {
	const { name, email, type, phone } = req.body;
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact)
			return res
				.status(404)
				.json({ errors: [{ contact: 'contact not found' }] });

		if (contact.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ errors: [{ contact: 'Unauthorized access' }] });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);
		res.json({ contact });
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /api/contacts/:id
// @desc    Get user's single contact
// @access  Private

router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact)
			return res
				.status(404)
				.json({ errors: [{ contact: 'contact not found' }] });

		if (contact.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ errors: [{ contact: 'Unauthorized access' }] });
		}
		await Contact.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact deleted' });
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
