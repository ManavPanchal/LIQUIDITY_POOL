const express = require('express');
const router = express.Router();
const getPools = require('../controllers/getPools');
router.get('/', getPools);
module.exports = router;
