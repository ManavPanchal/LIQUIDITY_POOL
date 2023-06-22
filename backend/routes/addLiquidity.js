const express = require('express');
const router = express.Router();
const addLiquidity = require('../controllers/addLiquidity');
router.post('/', addLiquidity);
module.exports = router;
