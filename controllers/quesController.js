const Question = require('../models/question');
const Option = require('../models/option');


//CREATE A QUESTION
module.exports.createQuestion = async function (req, res) {
    try {
        let result = await Question.create({
            title: req.body.title,
        });
        result.save();

        res.status(200).json({
            id:result._id,
            question: result.title
        });
    } catch (err) {
        res.status(500).json({
            message:"Internal Error in Creating Question",
            error: err
        });
    }
};

// DELETE A QUESTION AND ALL ITS OPTIONS
module.exports.deleteQuestion = async function(req, res){
    try{
        let question = await Question.findById(req.params.id);
        question.remove();
        await Option.deleteMany({question: req.params.id});
        return res.json(200, {
            message: "Question and Associated Options Deleted Successfully"
        });

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error in Deleting Question"
        });
    }
    
}

// GET A QUESTION
module.exports.getQuestion = async function (req, res) {
    try {
        const id = req.params.id;
        let question = await Question.find({ _id: id }).populate('options').select('title _id ');
        console.log(question);
        if (question.length > 0) {
            res.status(200).json({Question:question});
        } else {
            res.status(200).json({
                message: "No Question available"
            });
        }
    } catch (err) {
        console.log('Error in getting a  question', err);
        res.status(500).json({
            message:"Error in getting a  question",
            error: err
        });
    }
};

// ADDING OPTIONS TO A QUESTION
module.exports.addOptionsToQuestions = async function(req, res){
    try{
        let ques = await Question.findById(req.params.id).populate('options').select('title _id ');
        if (ques){
            let option = await Option.create({
                text: req.body.text,
                votes: 0,
                question:req.params.id
            });
            option.link_to_vote = `http://localhost:8000/options/${option._id}/add_vote`;
            ques.options.push(option);
            ques.save();
            option.save();
            return res.json(200,{
                message:"Option Created Successfully",
                question:ques
            });
        }else{
            return res.status(404).json({
                message:"Question Not Found"
            });
        }
    }catch(err){
        return res.json(500,{
            message:"Internal Server Error in adding Options"
        });
    }
};
