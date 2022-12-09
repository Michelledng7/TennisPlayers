const express = require('express');

const router = express.Router();
const {
	getMatches,
	createMatches,
	updateMatch,
	deleteMatch,
} = require('../controllers/matchController');

const { protect } = require('../middleware/authmiddleware');

router.route('/').get(protect, getMatches).post(protect, createMatches);
//router.get('/', getTennis);
//router.post('/', createMatches);

router.route('/:id').put(protect, updateMatch).delete(protect, deleteMatch);
//router.put('/:id', updateTennis);
//router.delete('/:id', deleteTennis);

module.exports = router;
