const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
    numberOfQuestions : {
        type : Number ,
        default : 20,
        required : [true , "you need to define the number of questions!"]
    },
    questionDuration : {
        type : Number ,
        default : 30,
        required : [true , "you need to define the duration of each questions in seconds!"]
    },
    questionScore : {
        type:Number,
        default : 20,
    },
    numberOfTopPlayers : {
        type : Number ,
        default : 3,
        required : [true , "you need to define the number of top players"]
    },
    numberOfMinimumAnsweredQuestionsToWin : {
        type : Number ,
        default : 10,
        required : [true , "you need to define the minimum number of questions to be answered to consider as a winner"]
    }
})

const settings = mongoose.model("Settings" , settingsSchema)
module.exports = settings;