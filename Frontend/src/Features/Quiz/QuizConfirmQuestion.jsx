import { GiConfirmed } from "react-icons/gi";

import Button from "../../UI/Button";

function QuizConfirmQuestion({selectedAnswer , handleSetConfirmQuestion}) {
    return  <div className={`w-full flex items-center justify-end`}>
        <Button disabled={!selectedAnswer} onClick={handleSetConfirmQuestion} size = "primary" variation="confirm">confirm my answer <GiConfirmed /></Button>

    </div>
}
export default QuizConfirmQuestion;