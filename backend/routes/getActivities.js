const express = require('express');
const router = express.Router();
const getActivities = require('../controllers/getActivities');
router.get('/', getActivities);
module.exports = router;
