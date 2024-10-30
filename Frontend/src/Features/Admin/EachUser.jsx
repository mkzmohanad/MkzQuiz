import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import tw from "tailwind-styled-components"

import Button from "./../../UI/Button"

const UserData = tw.p`
    font-bold 
    italic 
    md:text-base
    sm:text-sm
    text-xs
`

function EachUser({ userData , handleSetToggleModal , setUserToDelete }) {
    const { username, email, _id, startGame, highestScore, totalMatchesPlayed, winRate } = userData;

    const [toggleShowDetails, setToggleShowDetails] = useState(false)

    function handleDeletingUser() {
        handleSetToggleModal();
        setUserToDelete(_id);
    }

    function handleSetToggleShowDetails() {
        setToggleShowDetails((toggle) => !toggle)
    }

    return <li className={`transition duration-300 ${toggleShowDetails ? "h-fit sm:h-2/5 " : ""}`}>
                <div className="text-lightColor border-b-[1px] border-lightColor flex items-center justify-between">
                    <div>
                        <p className="capitalize">{username}</p>
                        <p className="opacity-40 text-sm italic">{email}</p>
                    </div>
                    <button onClick={handleSetToggleShowDetails}>
                        <p className={`text-2xl cursor-pointer transition duration-300 ${toggleShowDetails ? "rotate-180" : ""}`}><IoIosArrowDown /></p>
                    </button>
                </div>
                {toggleShowDetails && <div className="h-full text-lightColor py-3 flex flex-col justify-center gap-6">
                    <div className="flex items-center justify-between  sm:mt-7 flex-col sm:flex-row">
                        <h2 className="font-bold text-sm md:text-xl mb-3 sm:mb-0">{`User ID: ${_id}`}</h2>
                        <p className="font-bold text-sm md:text-lg capitalize">player status: {startGame ? "playing now" : "not playing"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-7">
                        <UserData >{`highest score: ${highestScore}`}</UserData>
                        <UserData>{`total matches played: ${totalMatchesPlayed}`}</UserData>
                        <UserData>{`win rate: ${winRate}`}</UserData>
                    </div>
                    <div className="w-full sm:w-2/3">
                        <Button size="primary" variation="danger" onClick={handleDeletingUser}>delete user</Button>
                    </div>
                </div>}
            </li>
}
export default EachUser;
