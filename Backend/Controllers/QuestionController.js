const asyncHandler = require("../Utils/asyncHandler");
const Question = require("./../Models/QuestionModel");
const { getAll, addOne, deleteOne, updateOne, getOne } = require("./FactoryController");

exports.getAllQuestions = getAll(Question);
exports.addNewQuestion = addOne(Question);
exports.deleteQuestion = deleteOne(Question);
exports.updateQuestion = updateOne(Question);
exports.getOneQuestion = getOne(Question);

exports.deleteAllQuestions = asyncHandler(async (req, res , next) => {
    await Question.deleteMany({});

    res.status(204).json({
        status : "success",
        data : null
    })
})