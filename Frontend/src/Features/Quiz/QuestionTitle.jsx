function QuestionTitle({title , questionNum , numberOfAllQuestions}) {
    return  <div className="px-4 md:px-8 py-6 text-mediumColor flex justify-start items-center border-2 border-lightColor rounded-md sm:text-2xl w-full break-all">
        <p className="underline p-3 font-bold">{questionNum + 1} / {numberOfAllQuestions}:</p>
        <h1 className="font-bold text-1xl">{title}?</h1>
    </div>
}
export default QuestionTitle;