const express = require('express');
const router = express.Router();
const OptionsApi = require('../controllers/options_api');



// router.post('/create', OptionsApi.create);

router.get('/:id/add_vote', OptionsApi.addVote);

router.delete('/:id/delete', OptionsApi.destroy);

module.exports = router;