const asyncHandler = require('express-async-handler');
const Player = require('../models/playerModel');
const Matches = require('../models/matchModel');

const getTennis = asyncHandler(async (req, res) => {
	const matches = await Matches.find({ user: req.player.id });
	res.status(200).json(matches);
});

const createTennis = asyncHandler(async (req, res) => {
	console.log('createMatches');
	console.log(req.player.id);
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add the match details');
	}
	const matches = await Matches.create({
		text: req.body.text,
		player: req.player.id,
	});

	res.status(200).json(matches);
});

const updateTennis = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `update ${req.params.id}` });
});

const deleteTennis = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `delete ${req.params.id}` });
});

module.exports = { getTennis, createTennis, updateTennis, deleteTennis };
