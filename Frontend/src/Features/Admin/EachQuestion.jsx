import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import tw from "tailwind-styled-components";

import Button from "../../UI/Button";

const UserData = tw.p`
    font-bold 
    italic 
    md:text-base
    sm:text-sm
    text-xs
`

function EachQuestion({question , setQuestionToDelete , handleSetToggleModalSingleQuestion , handleSetToggleModalCreateEditQuestion , setQuestionToEdit , questionNumber}) {
    const {_id , question:questionTitle , options , answer , category , questionPoints} = question;

    const [toggleShowDetails, setToggleShowDetails] = useState(false)

    function handleSetToggleShowDetails() {
        setToggleShowDetails((toggle) => !toggle)
    }

    function handleDeletingSingleQuestion() {
        setQuestionToDelete(_id);
        handleSetToggleModalSingleQuestion();
    }
    function handleEditQuestion() {
        setQuestionToEdit(question);
        handleSetToggleModalCreateEditQuestion()
    }

    return  <li className={`transition duration-300 ${toggleShowDetails ? "h-fit " : ""}`}>
                <div className="text-lightColor border-b-[1px] border-lightColor flex items-center justify-between">
                    <div>
                        <p className="capitalize">Q{questionNumber + 1}: {questionTitle}</p>
                        <p className="opacity-40 text-sm italic">Category: {category}</p>
                    </div>
                    <button onClick={handleSetToggleShowDetails}>
                        <p className={`text-2xl cursor-pointer transition duration-300 ${toggleShowDetails ? "rotate-180" : ""}`}><IoIosArrowDown /></p>
                    </button>
                </div>
                {toggleShowDetails && <div className="h-full text-lightColor py-3 flex flex-col justify-center gap-6">
                    <div className="flex items-center justify-between  sm:mt-7 flex-col sm:flex-row">
                        <h2 className="font-bold text-sm md:text-xl mb-3 sm:mb-0">{`Question ID: ${_id}`}</h2>
                        <p className="font-bold text-sm md:text-lg capitalize">Question answer: {answer}</p>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-7">
                        <UserData >{`question points: ${questionPoints}`}</UserData>
                        <UserData>question options: {options.map((option , index) => <span key={index}><br/>{index+1}- {option} </span>)}
                        </UserData>
                    </div>
                    <div className="w-full flex-col md:flex-row md:w-2/3 flex items-center gap-5">
                        <Button size="primary" variation="danger" onClick = {handleDeletingSingleQuestion}>delete question</Button>
                        <Button size="primary" variation="edit" onClick = {handleEditQuestion}>edit question</Button>
                    </div>
                </div>}
            </li>
}
export default EachQuestion;