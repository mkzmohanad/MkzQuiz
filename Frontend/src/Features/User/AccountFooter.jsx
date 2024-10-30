import { LiaHourglassStartSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

import UserRank from "./UserRank";
import Button from "../../UI/Button";

function AccountFooter({rank}) {
    const navigate = useNavigate()

    return  <div className="flex lg:flex-row flex-col items-center w-full gap-5">
        <div className="w-full lg:w-[45%]">
            <UserRank rank={rank}/>
        </div>
        <div className="w-full sm:w-[45%] flex flex-col items-end h-[128px] justify-between">
            <Button size="primary" variation="start" onClick={() => navigate("/quizInfo")}>start now! <LiaHourglassStartSolid /> </Button>
            <Button size="primary" variation="back" onClick={() => navigate("/result")}>Check last result</Button>
        </div>
    </div>
}
export default AccountFooter;