import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import Button from "../../UI/Button";

function FinishQuiz({setCurrentQuestionIndex}) {

    function handleFinishQuizButton() {
        setCurrentQuestionIndex((currentIndex) => currentIndex = currentIndex + 1);
    }

    return  <div className="flex items-center justify-end ">
        <Button onClick={handleFinishQuizButton} size="primary" variation="finish">finish the quiz <IoCheckmarkDoneCircleOutline className=""/></Button>
    </div>
}
export default FinishQuiz;