const express = require('express');
const router = express.Router();
const removeLiquidity = require('../controllers/removeLiquidity');
router.post('/', removeLiquidity);
module.exports = router;
