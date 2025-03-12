import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useUpdateUserData } from "../Features/User/useUpdateUserData";

export function useFinishQuiz() {
    const {updateUserData} = useUpdateUserData();
    const navigate = useNavigate();
    
    const handleFinishQuiz= async (data , win) => {
        try {
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