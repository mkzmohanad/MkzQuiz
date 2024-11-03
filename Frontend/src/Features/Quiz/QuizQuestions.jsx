import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useQuestions } from "./useQuestions";
import { useStartingGame } from "./useStartingGame"
import { useTimer } from "../../Hooks/useTimer";
import { useFinishQuiz } from "../../Hooks/useFinishQuiz";
import { SECONDS_PER_QUESTION } from "../../Utils/constants";
import { useSettings } from "../Settings/useSettings";

import Loading from "../../UI/Loading";
import QuestionTitle from "./QuestionTitle";
import QuizQuestionAnswer from "./QuizQuestionAnswer";
import QuizNextQuestion from "./QuizNextQuestion";
import QuizConfirmQuestion from "./QuizConfirmQuestion";
import FinishQuiz from "./FinishQuiz";
import QuizHeader from "./QuizHeader";



function QuizQuestions() {
    const [currentQuestionIndex , setCurrentQuestionIndex] = useState(0);
    const [totalCorrectAnswers , setTotalCorrectAnswers] = useState(0); 
    const [totalWrongAnswers , setTotalWrongAnswers] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);
    const [score , setScore] = useState(0);
    const [selectedAnswer , setSelectedAnswer] = useState("")
    const [confirmedAnswer , setConfirmedAnswer] = useState(false)
    const [isActive, setIsActive] = useState(true);

    const secondsLeft = useTimer(SECONDS_PER_QUESTION , resetCounter , isActive)
    const {questions , isLoadingQuestions} = useQuestions();
    const {settings , isLoadingSettings} = useSettings();
    const {isStartingGame} = useStartingGame();
    const handleFinishQuiz = useFinishQuiz();

    const numberOfQuestions = settings?.data?.numberOfQuestions || 20;

    const allQuestions = questions?.data?.docs.slice(0 , numberOfQuestions ) || [];
    
    useEffect(function () {
        if(secondsLeft === 0) {
            toast.error("Time is over for this question head to the next one and be faster!");
            handleSetConfirmQuestion();
            handleNextQuestion();
            setTotalWrongAnswers((currentWrongAnswers) => currentWrongAnswers += 1)
        }
    },[secondsLeft])

    useEffect(function() {
        if(allQuestions.length > 0 && currentQuestionIndex >= allQuestions.length) {
            const win = totalCorrectAnswers >= allQuestions.length / 2;
            handleFinishQuiz({
                "startGame" : false,
                "lastScore" : score,
                "isWin" : win ? "win" : "lose",
                "totalCorrectAnswersLastMatch" : totalCorrectAnswers,
            }, win)
        }
    },[currentQuestionIndex, allQuestions.length])
    
    function handleNextQuestion() {
        setResetCounter((change) => change + 1)
        setCurrentQuestionIndex((question) => question + 1)
        setSelectedAnswer("")
        setConfirmedAnswer(false);
        setIsActive(true)
    }

    function handleSetConfirmQuestion() {
        const isConfirmed = true;
        setConfirmedAnswer(isConfirmed);
        setIsActive(false)
        if(secondsLeft === 0) handleSetScore(false);
        else handleSetScore(isConfirmed)
    }

    function handleSetScore(isConfirmed) {
        if(isConfirmed) {
            if(selectedAnswer === allQuestions[currentQuestionIndex].answer) {
                setScore((currentScore) => currentScore+=allQuestions[currentQuestionIndex].questionPoints)
                setTotalCorrectAnswers((currentCorrectAnswers) => currentCorrectAnswers += 1)
            }
            else {
                setTotalWrongAnswers((currentWrongAnswers) => currentWrongAnswers += 1)
            } 
        }
    }

    if(isStartingGame || isLoadingQuestions  || isLoadingSettings) return <Loading />

    if(!allQuestions[currentQuestionIndex]) return <Loading />

    const currentQuestion = allQuestions[currentQuestionIndex]

    return  <div className="w-5/6 lg:w-1/2 flex flex-col justify-center gap-6 mt-5">

        <QuizHeader 
            secondsLeft = {secondsLeft} 
            totalWrongAnswers = {totalWrongAnswers} 
            totalCorrectAnswers = {totalCorrectAnswers}
        />

        <QuestionTitle 
            title = {currentQuestion.question} 
            questionNum = {currentQuestionIndex} 
            numberOfAllQuestions = {allQuestions.length}
        />

        <QuizQuestionAnswer 
            question = {currentQuestion} 
            setSelectedAnswer = {setSelectedAnswer} 
            selectedAnswer = {selectedAnswer} 
            confirmedAnswer = {confirmedAnswer}
        />

        {!confirmedAnswer ? 
        <QuizConfirmQuestion 
            selectedAnswer={selectedAnswer} 
            handleSetConfirmQuestion = {handleSetConfirmQuestion}
            />
        : ""}

        {confirmedAnswer ? 
        allQuestions.length -1 !== currentQuestionIndex ?
        <QuizNextQuestion 
            handleNextQuestion = {handleNextQuestion} 
        /> : 
        <FinishQuiz 
            setCurrentQuestionIndex = {setCurrentQuestionIndex} /> 
        : ""}
    </div>
}
export default QuizQuestions;