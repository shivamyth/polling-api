const Question = require('../models/question');
const Option = require('../models/option');

//DELETE OPTION
module.exports.deleteOption = async function(req, res){
    try{
        let option = await Option.findById(req.params.id);
        if(option.votes>0){
            return res.status(403).json({
                message:"Not allowed to Delete Option as It has more than zero votes"
            })
        }else{
            let quesId = option.question;
            option.remove();
            let question = await Question.findByIdAndUpdate(quesId, { $pull: {options: req.params.id}});
            return res.status(200).json({
                message:"Option Deleted Successfully"
            });
        }
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error in Deleting Option"
        });
    }
};

// INCREASE THE VOTE OF A OPTION
module.exports.incrementVotes = async function (req, res) {
    try {
        const id = req.params.id;
        let option = await Option.findOne({ _id: req.params.id });
        console.log("Option",option);
        let votes = option.votes+1;
        let quesId = option.question;
        let result = await Option.update({ _id: id}, { $set: { votes:votes } });
        let question = await Question.findByIdAndUpdate(quesId, { $pull: {comments: req.params.id}});
        res.status(200).json({
            message: "Vote Added Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message:"Internal Error in Adding Vote",
            error: err
        });
    }
};