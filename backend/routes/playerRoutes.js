const express = require('express');
const router = express.Router();
const {
	registerPlayer,
	loginPlayer,
	getPlayer,
} = require('../controllers/playerController');

router.post('/', registerPlayer);
router.post('/login', loginPlayer);
router.get('/:id', getPlayer);

module.exports = router;
