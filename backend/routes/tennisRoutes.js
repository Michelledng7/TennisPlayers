const express = require('express');

const router = express.Router();
const {
	getTennis,
	createTennis,
	updateTennis,
	deleteTennis,
} = require('../controllers/tennisController');

const { protect } = require('../middleware/authmiddleware');

router.route('/').get(protect, getTennis).post(protect, createTennis);
//router.get('/', getTennis);
//router.post('/', createTennis);

router.route('/:id').put(protect, updateTennis).delete(protect, deleteTennis);
//router.put('/:id', updateTennis);
//router.delete('/:id', deleteTennis);

module.exports = router;
