import { HiCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import CircularProgressBar from "../../UI/CircularProgressBar";

function QuizHeader({totalWrongAnswers , totalCorrectAnswers , secondsLeft}) {
     
    return  <div className="flex items-center justify-between">
          <div>
               <CircularProgressBar secondsLeft = {secondsLeft}/>
          </div>
          <div className="border-2 border-lightColor px-2 sm:px-5 py-3 w-fit flex items-center gap-5">
               <div className="flex items-center justify-center gap-3">
                    <p className="text-lightColor font-bold sm:text-xl">{totalCorrectAnswers}</p>
                    <span className="text-green-600 text-2xl sm:text-3xl"><HiCheckCircle /></span>
               </div>
               <span className="text-lightColor text-3xl font-bold">/</span> 
               <div className="flex items-center justify-center gap-3">
                    <p className="text-lightColor font-bold sm:text-xl">{totalWrongAnswers}</p>
                    <span className="text-red-600 text-2xl sm:text-3xl"><HiMiniXCircle /></span>
               </div> 
          </div>
    </div>
}
export default QuizHeader