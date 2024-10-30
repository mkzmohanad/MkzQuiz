import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { editQuestion as editQuestionApi} from "../../Services/apiQuiz"

export function useEditQuestion() {
    const queryClient = useQueryClient()

    const {mutate : editQuestion , isPending : isEditing} = useMutation({
        mutationFn : editQuestionApi,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["questions"]}) 
            toast.success("question is edited successfully!");
        },
        onError : () => toast.error("error occurred while editing question, please try again later")
    })

    return {editQuestion , isEditing}
}