const express = require('express');
const router = express.Router();
const getActivities = require('../controllers/getActivities');
router.get('/:userAddress/:networkId', getActivities);
module.exports = router;
