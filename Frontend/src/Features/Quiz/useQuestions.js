import { useQuery } from "@tanstack/react-query";

import { getAllQuestions } from "../../Services/apiQuiz";

export function useQuestions() {
    const {data : questions , isPending : isLoadingQuestions} = useQuery({
        queryKey : ["questions"],
        queryFn :getAllQuestions
    })

    return {questions , isLoadingQuestions};
}