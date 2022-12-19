const asyncHandler = require('express-async-handler');
const Player = require('../models/playerModel');
const Matches = require('../models/matchModel');

// @desc    Fetch one player's matches
// @route   GET /api/matches
// @access  Private
const getMatches = asyncHandler(async (req, res) => {
	const matches = await Matches.find({ player: req.player.id });
	console.log('matches');
	console.log(req.player);
	res.status(200).json(matches);
});

// @desc    Create a match
// @route   POST /api/tennis
// @access  Private
const createMatches = asyncHandler(async (req, res) => {
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

// @desc    Update authorized player's matches
// @route   PUT /api/matches/:id
// @access  Private
const updateMatch = asyncHandler(async (req, res) => {
	const match = await Matches.findById(req.params.id);

	if (!match) {
		res.status(404);
		throw new Error('Match not found');
	}

	// check player exists or not
	if (!req.player) {
		res.status(401);
		throw new Error('Player not found');
	}

	//pls check here
	//check if the logged user matches the goal user
	if (match.player.toString() !== req.player.id) {
		res.status(401);
		throw new Error('Not authorized to update the match');
	}
	const updatedMatch = await Matches.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updatedMatch);
});

// @desc    Delete authorized player's matches
// @route   DELETE /api/matches/:id
// @access  Private
const deleteMatch = asyncHandler(async (req, res) => {
	const match = await Matches.findById(req.params.id);

	if (!match) {
		res.status(404);
		throw new Error('Match not found');
	}
	// check player exists or not
	if (!req.player) {
		res.status(401);
		throw new Error('Player not found');
	}
	//check if the logged user matches the goal user
	if (match.player.toString() !== req.player.id) {
		res.status(401);
		throw new Error('Not authorized to delete the match');
	}
	await Matches.deleteOne(match);
	res.status(200).json(match);
});

module.exports = { getMatches, createMatches, updateMatch, deleteMatch };
