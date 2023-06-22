const express = require('express');
const router = express.Router();
const getProvider = require('../controllers/getProvider');
router.get('/', getProvider);
module.exports = router;
