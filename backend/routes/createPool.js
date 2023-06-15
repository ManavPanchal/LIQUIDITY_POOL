const express = require('express');
const router = express.Router();
const createPool = require('../controllers/createPool');
router.post('/', createPool);
module.exports = router;
