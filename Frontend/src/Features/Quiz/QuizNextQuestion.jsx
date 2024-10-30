import { GrFormNext } from "react-icons/gr";

import Button from "../../UI/Button";

function QuizNextQuestion({handleNextQuestion}) {
    return  <div className="flex items-center justify-end w-full">
        <Button onClick={handleNextQuestion} size="primary" variation="next">next question <GrFormNext className="text-3xl"/> </Button>
    </div>
}
export default QuizNextQuestion;