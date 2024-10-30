import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteSingleQuestion as deleteSingleQuestionApi} from "../../Services/apiQuiz"
import toast from "react-hot-toast";

export function useDeleteSingleQuestion() {
    const queryClient = useQueryClient()

    const {mutate : deleteSingleQuestion , isPending : isDeletingSingleQuestion } = useMutation({
        mutationFn : deleteSingleQuestionApi,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["questions"]})
            toast.success("Question is deleted successfully!")
        },
        onError : () => toast.error("Error occurred while deleting the question, please try again")
    })

    return {deleteSingleQuestion , isDeletingSingleQuestion}
}