const express = require('express');
const router = express.Router();
const swappedTokens = require('../controllers/swapTokens');
router.post('/', swappedTokens);
module.exports = router;
