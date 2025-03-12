const express = require('express');

const { getAllQuestions, addNewQuestion, deleteQuestion, updateQuestion, getOneQuestion, deleteAllQuestions } = require('../Controllers/QuestionController');
const { protectRoutes, restrictedTo } = require('../Controllers/AuthController');

const questionRoutes = express.Router();

questionRoutes.use(protectRoutes);

questionRoutes.route("/").get(getAllQuestions);

questionRoutes.use(restrictedTo(["admin"]));

questionRoutes.route("/").post(addNewQuestion).delete(deleteAllQuestions)
questionRoutes.route("/:id").delete(deleteQuestion).patch(updateQuestion).get(getOneQuestion);

module.exports = questionRoutes;