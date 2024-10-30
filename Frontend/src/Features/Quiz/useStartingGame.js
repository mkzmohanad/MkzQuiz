import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { userStartedGame as userStartedGameApi } from "../../Services/apiQuiz";

export function useStartingGame() {
    const {mutate : startingGame , isPending : isStartingGame} = useMutation({
        mutationFn : userStartedGameApi,
        onSuccess : () => {
            toast.success("Starting game now...")
        },
        onError : () => {
            toast.error("Failed to start game please try again later.")
        }
    })
    return {startingGame , isStartingGame}
}