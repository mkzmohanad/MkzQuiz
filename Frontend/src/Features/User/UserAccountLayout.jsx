import { HiOutlineTrophy } from "react-icons/hi2";

import { useUserAccount } from "./useUserAccount";

import UserHighestScore from "./UserHighestScore";
import UserStatistics from "./UserStatistics";
import WelcomingUser from "./WelcomingUser";
import AccountFooter from "./AccountFooter";
import Loading from "../../UI/Loading";

function UserAccountLayout() {
    const {user , isLoading , userRank} = useUserAccount();
    
    if(isLoading) return <Loading />

    const {lastScore , totalMatchesPlayed , highestScore , winRate} = user.data.data;
    const {data : rank} = userRank;
    console.log(rank)

    return  <main className="py-10 px-5 md:px-10 flex flex-col gap-8 h-vh bg-darkestColor">
        <WelcomingUser/>
        <UserStatistics lastScore = {lastScore} totalMatchesPlayed = {totalMatchesPlayed} winRate = {winRate}/>
        <UserHighestScore highestScore = {highestScore}  icon = {<HiOutlineTrophy />} name = "highest score"/>
        <AccountFooter rank = {rank}/>
    </main>
}
export default UserAccountLayout;