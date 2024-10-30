import { useQuery } from "@tanstack/react-query";
import { getAllQuestions as getAllQuestionsApi } from "../../Services/apiQuiz";

export function useGetAllQuestions() {
    const {data : questions , isPending : isLoadingQuestions} = useQuery({
        queryKey : ["questions"],
        queryFn : getAllQuestionsApi
    })
    return {questions , isLoadingQuestions};
}