import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { userCompletedGame as userCompletedGameApi } from "../../Services/apiQuiz";

export function useCompletingGame(){
    const {mutate : completeGame , isPending : isCompletingGame} = useMutation({
        mutationFn : userCompletedGameApi,
        onError : () => {
            toast.error("Failed to complete quiz")
        }
    })

    return {completeGame , isCompletingGame};
}