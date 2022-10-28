const jwt = require('jsonwebtoken');
const player = require('../models/playerModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
	let token;
	//console.log(req.headers.authorization);
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get the player id from the token payload
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded);

			// get player from token, assign the player id to the request player
			req.player = await player.findById(decoded.id).select('-password');
			console.log(req.player);
			next();
		} catch (error) {
			console.log(error);
			//401 not authorized
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

module.exports = { protect };
