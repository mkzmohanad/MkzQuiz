import tw from "tailwind-styled-components";
import { MdScoreboard } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import { GiConfirmed } from "react-icons/gi";
import { IoIosTime } from "react-icons/io";

import { useUserAccount } from "./useUserAccount";
import { useSettings } from "../Settings/useSettings";

import Loading from "../../UI/Loading";

const SingleResult = tw.div`
    bg-darkColor 
    rounded-lg 
    w-full 
    h-72 
    py-6 
    px-5
`

const ResultHeading = tw.h2`
    text-lightColor 
    text-center 
    font-bold 
    text-xl
`

const ResultData = tw.div`
    w-full 
    h-full 
    flex 
    items-center 
    justify-center 
    text-lightColor 
    text-3xl 
    gap-1
    `

function UserResultLayout() {
    const {user , isLoadingUser} = useUserAccount();
    const {settings , isLoadingSettings} = useSettings();

    if(isLoadingUser || isLoadingSettings) return <Loading />

    const {lastScore , totalTakenTimeLastMatch , totalCorrectAnswersLastMatch , isWin} = user.data.data;
    const {numberOfQuestions , questionScore} = settings.data;

    const matchWinRate = (totalCorrectAnswersLastMatch / numberOfQuestions) * 100 ;
    const scoreOfAllQuestions = numberOfQuestions * questionScore;

    return <>
        <main className="py-32 px-4 sm:px-10 flex items-center justify-center flex-wrap gap-8 h-fit bg-darkestColor text-center">
            <div className="flex flex-col lg:flex-row w-full 2xl:w-2/3 gap-10">
                <SingleResult >
                    <ResultHeading>You have scored in this match: </ResultHeading>
                    <ResultData >
                        <MdScoreboard className="text-4xl" />
                        <p>{lastScore} / {scoreOfAllQuestions}</p>
                    </ResultData>
                </SingleResult>

                <SingleResult>
                    <ResultHeading>Your win rate at this match is: </ResultHeading>
                    <ResultData>
                        <HiReceiptPercent className="text-4xl" />
                        <p>{matchWinRate}% <span className="uppercase">{`(${isWin === "win" ? isWin + "🎉🎉" : isWin + "😥😥"})`}</span></p>
                    </ResultData>
                </SingleResult>
            </div>
            <div className="flex flex-col lg:flex-row w-full 2xl:w-2/3 gap-10">
                <SingleResult >
                    <ResultHeading>Your total correct answer in this match is: </ResultHeading>
                    <ResultData>
                        <GiConfirmed className="text-4xl" />
                        <p>{totalCorrectAnswersLastMatch} / {numberOfQuestions}</p>
                    </ResultData>
                </SingleResult>

                <SingleResult>
                    <ResultHeading>Total time taken to complete this match is: </ResultHeading>
                    <ResultData>
                        <IoIosTime className="text-4xl" />
                        <p>{totalTakenTimeLastMatch} Seconds</p>
                    </ResultData>
                </SingleResult>
            </div>
        </main>
    </>
}
export default UserResultLayout;