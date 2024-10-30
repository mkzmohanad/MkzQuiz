
function QuestionsOption({option , optionNum , onClick , selectedAnswer , confirmedAnswer}) {

    return  <button onClick={() => onClick(option)} className={`p-4 text-mediumColor flex justify-start items-center gap-5 border-2 border-lightColor rounded-lg sm:text-2xl w-full break-all cursor-pointer outline-none hover:bg-mediumColor hover:text-darkColor group hover:translate-x-4 transition-all duration-300 ${selectedAnswer === option ? "text-darkColor bg-mediumColor translate-x-4" : ""} ${confirmedAnswer  ?
     selectedAnswer !== option ? "!cursor-not-allowed hover:bg-darkestColor hover:text-mediumColor hover:translate-x-0" : "" : ""}`}>

        <p className={`border-2 group-hover:border-darkColor px-5 py-2 rounded-md font-bold ${selectedAnswer === option ? "text-darkColor bg-mediumColor border-darkColor" : ""} ${confirmedAnswer ?
            selectedAnswer !== option ? "group-hover:border-lightColor" :"" : ""}`}>{optionNum}</p>

        <h3 className={`capitalize  ${selectedAnswer === option ? "text-darkColor" : "" } ${confirmedAnswer ? 
            selectedAnswer !== option ? "text-mediumColor" :"" : ""}`}>{option}</h3>
    </button>
}
export default QuestionsOption;