const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
	{
		player: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Please add a player id'],
			ref: 'Player', //associated with model player
		},
		text: {
			type: String,
			required: [true, 'Please add text for your match'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Matches', matchSchema);
