const Question = require('../models/Question');

// Adding vote to the options 
module.exports.addVote = async function (req, res) {
  try {
    let question = await Question.findOne({ 'options._id': req.params.id });
    if (!question) {
      return res.status(404).json({ error: 'Option not found' });
    }

    let option = question.options.id(req.params.id);
    option.votes++;
    await question.save();

    //   res.status(201); // Send the updated option in the response
    res.redirect('/questions');
  } catch (err) {
    res.status(500).json({ error: 'Unable to add vote to the option' });
  }
};

// For destroying a options from question
module.exports.destroy = async function (req, res) {
  try {
    let question = await Question.findOne({
      'options._id': req.params.id
    });
    // console.log(question);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    const option = question.options.id(req.params.id);
    if (option.votes > 0) {
      return res.status(400).json({ error: 'Cannot delete option with votes' });
    }
    question.options.pull({ _id: req.params.id });
    await question.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the option' });
  }
}