const { url } = require('inspector');
const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title: String,
    options: [
      {
        text: String,
        votes: { type: Number, default: 0 },
      },
    ],
  });
  
  const Question = mongoose.model('Question', questionSchema);
  
  module.exports = Question;
  