import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewQuestion as createNewQuestionApi} from "../../Services/apiQuiz"
import toast from "react-hot-toast";

export function useCreateNewQuestion() {
    const queryClient = useQueryClient()

    const {mutate : createNewQuestion , isPending : isCreatingNewQuestion } = useMutation({
        mutationFn : createNewQuestionApi,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["questions"]})
            toast.success("question added successfully.");
        },
        onError : () => {
            toast.error(`an error occurred while adding new question!, Please check for the rules of adding questions and follow them`)
        }
    })
    return {createNewQuestion , isCreatingNewQuestion}
}