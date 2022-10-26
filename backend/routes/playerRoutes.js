const express = require('express');
const router = express.Router();
const {
	registerPlayer,
	loginPlayer,
	getPlayer,
} = require('../controllers/playerController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerPlayer);
router.post('/login', loginPlayer);
router.get('/authorized', protect, getPlayer);

module.exports = router;
