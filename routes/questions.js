const express = require('express');
const router = express.Router();
const QuestionApi = require('../controllers/questions_api');


router.post('/create', QuestionApi.create);
router.post('/:id/options/create' , QuestionApi.createOption);
router.get('/', QuestionApi.index);
router.get('/:id',QuestionApi.viewQuestion);
router.delete('/:id/delete', QuestionApi.destroy);

module.exports = router;