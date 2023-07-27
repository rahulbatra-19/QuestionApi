const Question = require('../models/Question');

module.exports.create = async function (req, res) {
    try {
        let { title } = req.body;
        let question = await Question.create({
            title
        });

        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: 'Unable to create the question' });
    }

}

module.exports.index = async function (req, res) {
    try {
        let questions = await Question.find({});
        if (!questions) {
            return res.status(404).json({ error: 'No Questions' });
        }
        
        let questionstodisplay =[];
        let i=0;
        for(let question of questions){
            console.log(question);
             let questionWithLinks = {
                id: question._id,
                title: question.title,
                options: question.options.map((option) => ({
                  id: option._id,
                  text: option.text,
                  votes: option.votes,
                  link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
                })),}
                questionstodisplay[i++] = questionWithLinks;
            }
              
        console.log(questionstodisplay);
        res.json(questionstodisplay);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch the question' });
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        if (question.options.some((option) => option.votes > 0)) {
          return res.status(400).json({ error: 'Cannot delete question with votes' });
        }
        await question.deleteOne();
        res.status(204).send("Deleted Questions");
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete the question' });
    }
}

module.exports.viewQuestion = async function (req, res) {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
          return res.status(404).json({ error: 'Question not found' });
        }
    
        const questionWithLinks = {
          id: question._id,
          title: question.title,
          options: question.options.map((option) => ({
            id: option._id,
            text: option.text,
            votes: option.votes,
            link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
          })),
        };
    
        res.json(questionWithLinks);
      } catch (err) {
        res.status(500).json({ error: 'Unable to fetch the question' });
      }
}


module.exports.createOption = async function(req, res){

    try {
        // console.log(req.originalUrl);
        let question = await Question.findById(req.params.id);
        if (!question) {
          return res.status(404).json({ error: 'Question not found' });
        }
        let { title } = req.body;
        console.log({title});

        question.options.push({ text: title, votes: 0 });
        await question.save();
    
        res.status(201).json(question);
      } catch (err) {
        res.status(500).json({ error: 'Unable to add option to the question' });
      }
}