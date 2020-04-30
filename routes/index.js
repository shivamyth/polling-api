const express = require('express');
const router = express.Router();

// Index of Routes

router.use('/options', require('./options'));
router.use('/questions', require('./questions'));


module.exports = router;