import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useUpdateUserData } from "../Features/User/useUpdateUserData";
import { useCompleteGame } from "./useCompleteGame";

export function useFinishQuiz() {
    const completeGame = useCompleteGame();
    const {updateUserData , isUpdating} = useUpdateUserData();
    const navigate = useNavigate();
    
    const handleFinishQuiz= async (data , win) => {
        try {
            console.log(data)
            console.log(completeGame);
            // completeGame();
            updateUserData(data);
            navigate("/result")
            toast.success(`Quiz have been completed successfully, ${win ? "You Won Congratulations!🎉🎉" : "Unfortunately you didn't win this time Good Luck with the next time🔥🔥"}`)
        }
        catch(error) {
            toast.error("Something went wrong while completing the quiz. Please try again.")
        }
    }
    return handleFinishQuiz

}