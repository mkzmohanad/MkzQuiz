import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllQuestions as deleteAllQuestionsApi} from "../../Services/apiQuiz"
import toast from "react-hot-toast";

export function useDeleteAllQuestions() {
    const queryClient = useQueryClient();

    const {mutate : deleteAllQuestions , isPending : isDeletingAllQuestions} = useMutation({
        mutationFn : deleteAllQuestionsApi,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["questions"]}),
            toast.success("all Questions have been deleted successfully!")
        },
        onError : () => {
            toast.error("error occurred while deleting all questions...")
        }
    })

    return {deleteAllQuestions , isDeletingAllQuestions};
}