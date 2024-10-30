import LeaderboardForSingleUser from "./LeaderboardForSingleUser";

function LeaderboardUsers({numberOfTopPlayers , topPlayers}) {
    const {topUsers} = topPlayers.data;
    
    return  <div className={`mt-24 w-full flex flex-col gap-12 md:gap-${numberOfTopPlayers >= 3 ? "24" : "16"} overflow-y-scroll overflow-${numberOfTopPlayers >= 5 ? "hidden" : "y-scroll"}`}>
            {topUsers.map((topPlayer , index) => <LeaderboardForSingleUser 
            key={topPlayer._id}
            rank={index + 1}
            username={topPlayer.username}
            totalMatchesWon = {topPlayer.totalMatchesWon}
            highestScore = {topPlayer.highestScore}
            />)}
    </div>
}
export default LeaderboardUsers;