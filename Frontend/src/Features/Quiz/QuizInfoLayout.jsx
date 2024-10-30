import { useNavigate } from "react-router-dom";
import { MdOutlineStart } from "react-icons/md";

import { useSettings } from "../Settings/useSettings";
import { useStartGame } from "../../Hooks/useStartGame";

import Loading from "../../UI/Loading";
import Button from "../../UI/Button";
import QuizInfoAndRules from "./QuizInfoAndRules";

function QuizInfoLayout() {
    const { settings, isLoadingSettings } = useSettings();
    const startGame = useStartGame()
    const navigate = useNavigate()

    function handleStartGame() {
        startGame()
        navigate("/quiz")
    }

    if (isLoadingSettings) return <Loading />

    return <div className=" text-lightColor rounded-lg xl:p-16 pt-10 flex flex-col gap-10 w-full h-fit bg-darkestColor overflow-x-hidden">
        <h1 className="font-extrabold capitalize text-5xl underline text-center mt-16 md:mt-0 ">rules and information:</h1>
        <QuizInfoAndRules settings = {settings} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-52 mb-10 md:mb-0 px-10">
            <Button size = "primary" variation="back" onClick={() => navigate("/")}>back to account</Button>
            <Button size = "primary" variation="start" onClick={handleStartGame}>start the game <MdOutlineStart className="text-3xl" /> </Button>
        </div>
    </div>
}
export default QuizInfoLayout;
