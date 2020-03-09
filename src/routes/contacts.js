const express = require('express');

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all user's contacts
// @access  Private

router.get('/', (req, res) => {
	res.send("User's contacts");
});

// @route   POST /api/contacts
// @desc    Create user's contacts
// @access  Private

router.post('/', (req, res) => {
	res.send("create User's contacts");
});

// @route   GET /api/contacts/:id
// @desc    Get user's single contact
// @access  Private

router.get('/:id', (req, res) => {
	res.send("get User's contact");
});

// @route   PUT /api/contacts/:id
// @desc    Update user's single contact
// @access  Private

router.put('/:id', (req, res) => {
	res.send("update User's contact");
});

// @route   DELETE /api/contacts/:id
// @desc    Get user's single contact
// @access  Private

router.delete('/:id', (req, res) => {
	res.send("delete User's contact");
});

module.exports = router;
