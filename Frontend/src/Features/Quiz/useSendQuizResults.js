import { useMutation } from "@tanstack/react-query";

import { updateUserResults } from "../../Services/apiQuiz";

export function useSendQuizResults() {
    const {mutate : sendResults , isPending : isSending } = useMutation({
        mutationFn: updateUserResults
    })

    return {sendResults , isSending};
}