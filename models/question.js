const mongoose = require('mongoose');

//QUESTION SCHEMA
const quesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]
},{
    timestamps: true
});

const Question = mongoose.model('Question', quesSchema);
module.exports = Question;