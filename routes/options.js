const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');



//All Option Routes

router.post('/:id/add_vote',optionController.incrementVotes);
router.delete('/:id/delete',optionController.deleteOption);


module.exports = router;