const express = require('express');
const router = express.Router();
const quesController = require('../controllers/quesController');



//All Question Routes

router.post('/create',quesController.createQuestion);
router.get('/:id',quesController.getQuestion);
router.delete('/:id/delete',quesController.deleteQuestion);
router.post('/:id/options/create',quesController.addOptionsToQuestions);


module.exports = router;