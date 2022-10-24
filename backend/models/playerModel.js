const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter a password'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Player', playerSchema);
