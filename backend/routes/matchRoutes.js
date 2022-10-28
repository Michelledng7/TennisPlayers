const express = require('express');

const router = express.Router();
const {
	getMatches,
	createTennis,
	updateMatch,
	deleteMatch,
} = require('../controllers/matchController');

const { protect } = require('../middleware/authmiddleware');

router.route('/').get(protect, getMatches).post(protect, createTennis);
//router.get('/', getTennis);
//router.post('/', createTennis);

router.route('/:id').put(protect, updateMatch).delete(protect, deleteMatch);
//router.put('/:id', updateTennis);
//router.delete('/:id', deleteTennis);

module.exports = router;
