import { useEffect, useState } from "react";
import QuestionsOption from "./QuestionsOption";

function QuizQuestionAnswer({question , setSelectedAnswer , selectedAnswer , confirmedAnswer}) {

    const [mixedOptions , setMixedOptions] = useState([])

    const { options } = question;
    
    function handleSetSelectedAnswer(optionSelected) {
        if(confirmedAnswer) return
        setSelectedAnswer(optionSelected);
    }
    
    useEffect(function() {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        setMixedOptions(shuffleArray([...options]))

    },[options])

    console.log(mixedOptions)

    return  mixedOptions.map((option , index) => <QuestionsOption onClick={handleSetSelectedAnswer} key={option} option={option} optionNum = {index + 1} selectedAnswer = {selectedAnswer} confirmedAnswer={confirmedAnswer}/>)
}
export default QuizQuestionAnswer;