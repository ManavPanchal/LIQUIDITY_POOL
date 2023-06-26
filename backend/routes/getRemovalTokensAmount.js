const express = require('express');
const router = express.Router();
const calculateRemovableTokens = require('../controllers/getRemovalTokensAmount');
router.post('/', calculateRemovableTokens);
module.exports = router;
