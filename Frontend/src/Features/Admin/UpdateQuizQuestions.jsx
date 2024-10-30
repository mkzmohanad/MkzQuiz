import { useState } from "react";

import { useToggleModal } from "../../Hooks/useToggleModal";
import { useDeleteSingleQuestion } from "./useDeleteSingleQuestion";
import { useGetAllQuestions } from "./useGetAllQuestions";
import { useDeleteAllQuestions } from "./useDeleteAllQuestions";

import Button from "../../UI/Button";
import ConfirmModal from "../../UI/ConfirmModal";
import Header from "../../UI/Header";
import Loading from "../../UI/Loading";
import WelcomingUser from "../User/WelcomingUser";
import EachQuestion from "./EachQuestion";
import CreateEditQuestion from "./CreateEditQuestion";
import NoResults from "../../UI/NoResults";

function UpdateQuizQuestions() {
    const [questionToDelete , setQuestionToDelete] = useState();
    const [questionToEdit , setQuestionToEdit] = useState({});

    const {questions , isLoadingQuestions} = useGetAllQuestions();
    const {deleteAllQuestions , isDeletingAllQuestions} = useDeleteAllQuestions();
    const {deleteSingleQuestion , isDeletingSingleQuestion} = useDeleteSingleQuestion();

    const {toggleModal:toggleModalSingleQuestion , handleSetToggleModal:handleSetToggleModalSingleQuestion} = useToggleModal(false);
    const {toggleModal:toggleModalAllQuestions , handleSetToggleModal:handleSetToggleModalAllQuestions} = useToggleModal(false);
    const {toggleModal:toggleModalCreateEditQuestion , handleSetToggleModal:handleSetToggleModalCreateEditQuestion} = useToggleModal(false);
    
    if(isLoadingQuestions || isDeletingSingleQuestion || isDeletingAllQuestions) return <Loading />

    const allQuestions = questions.data.docs

    function handleCloseModalCreateEdit() {
        handleSetToggleModalCreateEditQuestion(false)
        setQuestionToEdit({})
    }

    return <main className="flex flex-col h-vh bg-darkestColor">
        {toggleModalSingleQuestion ? <ConfirmModal 
        handleSetToggleModal = {handleSetToggleModalSingleQuestion} 
        warningMessage="are you sure you want to delete that question? " 
        actionName ="yes, delete now"
        functionToPerform={()=>deleteSingleQuestion(questionToDelete)}/> : ""}

        {toggleModalAllQuestions ? <ConfirmModal 
        handleSetToggleModal = {handleSetToggleModalAllQuestions} 
        warningMessage="ARE YOU SURE YOU WANT TO DELETE ALL QUESTIONS? " 
        actionName ="YES, DELETE ALL NOW"
        functionToPerform={deleteAllQuestions}/> : ""}

        {toggleModalCreateEditQuestion && <CreateEditQuestion 
            handleCloseModalCreateEdit = {handleCloseModalCreateEdit}
            questionToEdit = {questionToEdit} />}

        <Header />
        <div className="py-10 px-5 md:px-10 flex flex-col gap-8 h-dvh">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <WelcomingUser />
                <p className="text-lightColor mt-5 md:mt-24 text-lg md:text-xl font-bold capitalize italic">number of questions: {allQuestions.length}</p>
            </div>
            <ul className="h-full w-full bg-darkColor mx-auto rounded-md py-7 px-3 lg:p-7 space-y-7 sm:space-y-16 overflow-y-scroll overflow-x-hidden">
                {allQuestions.length > 0 ? allQuestions.map((question , index) => <EachQuestion key = {question._id}
                question = {question} 
                questionNumber = {index}
                setQuestionToDelete = {setQuestionToDelete} 
                handleSetToggleModalSingleQuestion = {handleSetToggleModalSingleQuestion}
                handleSetToggleModalCreateEditQuestion = {handleSetToggleModalCreateEditQuestion}
                setQuestionToEdit = {setQuestionToEdit} />)
                :<NoResults>no questions to show!</NoResults>
            }
            </ul>
        </div>
        <div className="flex flex-col md:flex-row w-full lg:w-1/2 items-center justify-start gap-8 px-10 pb-7">
            <Button variation="create" size = "primary"
            disabled={isLoadingQuestions || isDeletingSingleQuestion || isDeletingAllQuestions} 
            onClick = {() => handleSetToggleModalCreateEditQuestion(true)}>add new question</Button>
            <Button variation="danger" size = "primary" 
            disabled={isLoadingQuestions || isDeletingSingleQuestion || isDeletingAllQuestions} 
            onClick = {() => handleSetToggleModalAllQuestions(true)}>delete all questions</Button>
        </div>
    </main>
}
export default UpdateQuizQuestions;