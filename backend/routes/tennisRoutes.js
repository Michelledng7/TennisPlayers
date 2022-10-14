const express = require('express');

const router = express.Router();
const {
	getTennis,
	createTennis,
	updateTennis,
	deleteTennis,
} = require('../controllers/tennisController');

router.route('/').get(getTennis).post(createTennis);
//router.get('/', getTennis);
//router.post('/', createTennis);

router.route('/:id').put(updateTennis).delete(deleteTennis);
//router.put('/:id', updateTennis);
//router.delete('/:id', deleteTennis);

module.exports = router;
