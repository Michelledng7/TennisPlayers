const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
	{
		player: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Please enter your name'],
			ref: 'Player',
		},
		text: {
			type: String,
			required: [true, 'Please add text for your match'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Match', matchSchema);
