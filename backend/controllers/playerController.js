const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Player = require('../models/playerModel');

// @desc Register new player
// @route POST /api/players
// @access Public
const registerPlayer = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill in all fields');
	}

	//check if player exists
	const playerExists = await Player.findOne({ email });
	if (playerExists) {
		res.status(400);
		throw new Error('Player already exists');
	}

	// hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//create new player
	const player = await Player.create({
		name,
		email,
		password: hashedPassword,
	});
	if (player) {
		//if player is created
		res.status(201).json({
			_id: player.id, //_id is the default id for mongoDB
			name: player.name,
			email: player.email,
			token: generateToken(player._id),
		});
	} else {
		res.status(400);
		throw new Error('No player');
	}
});

// @desc Authenticate a player
// @route POST /api/players/login
// @access Public
const loginPlayer = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ message: 'Please enter in email and password' });
	}
	//check if player exists
	const player = await Player.findOne({ email }); //if player in database
	console.log(player);
	if (player && (await bcrypt.compare(password, player.password))) {
		res.json({
			_id: player.id,
			name: player.name,
			email: player.email,
			token: generateToken(player._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid email or password');
	}
});

// @desc Get currently logged in player
// @route GET /api/players/:id
// @access Private
const getPlayer = asyncHandler(async (req, res) => {
	const { _id, name, email } = await Player.findById(req.player.id);
	res.status(200).json({
		id: _id,
		name,
		email,
	});
});

//Generate JWT used by both register and login
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerPlayer, loginPlayer, getPlayer };
