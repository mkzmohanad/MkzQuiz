const mongoose = require('mongoose');
const validator = require('validator');
const SettingsModel = require("./SettingsModel");
const errorHandler = require('../Utils/errorHandler');

const QuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true , "you need to specify a question"],
        unique : [true , "there is another question with the same context"],
    },
    options : {
        type : [String],
        required : [true , "you need to provide 4 options"],
        validate : {
            validator : function(value) {
                return value.length === 4;
            },
            validator : function(value) {
                return value.every((option) => option === option.toLowerCase())
            },
            message : "you need to provide 4 options and all of them should be in lower case"
        },
    },
    answer : {
        type : String,
        required : [true , "you need to specify the correct answer from one of the 4 questions"],
        validate : {
            validator : function (value) {
              return `${this.options}`.includes(value)
            },
            validator : function(value) {
                return value === value.toLowerCase()
            },
            messages : "Please enter a valid answer that matches one of the 4 questions and should be in lower case"
        }
    },
    questionPoints : {
        type : Number,
    },
    category : {
        type : String,
        required : [true , "you need to specify a category of this question"],
    }
});

QuestionSchema.pre("save" , async function(next) {
    if(!this.questionPoints) {
        const settings = await SettingsModel.findOne();
        if(settings && settings.questionScore) this.questionPoints = settings.questionScore;
        else throw new Error("Could not retrieve defaultQuestionPoints from Settings");
    }
    next();
})

QuestionSchema.pre("save" , async function(next) {
    const finalOptions = this.options.map((element) => element.trim());
    const finalAnswer = this.answer.trim();

    this.answer = finalAnswer
    this.options = finalOptions;

    if(!this.options.includes(this.answer)) next(new errorHandler("Question answer should be included in the options" , 400))
    if(this.options.length !== 4) next(new errorHandler("Question options must be only 4 options!" , 400))
})

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;