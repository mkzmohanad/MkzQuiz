import Loading from "../../UI/Loading";
import { useSettings } from "../Settings/useSettings";
import LeaderboardHeading from "./LeaderboardHeading";
import LeaderboardUsers from "./LeaderboardUsers";
import { useGetTopPlayers } from "./useGetTopPlayers";

function LeaderboardLayout() {
    const {settings , isLoadingSettings} = useSettings();
    const {topPlayers , isLoading} = useGetTopPlayers()

    if(isLoadingSettings || isLoading) return <Loading />
    const {numberOfTopPlayers} = settings.data

    return  <div className="bg-darkColor w-full 2xl:w-2/3 h-2/3 relative rounded-lg flex pb-5 mt-24 sm:mt-16">
        <LeaderboardHeading>leaderboard for top {numberOfTopPlayers} players</LeaderboardHeading>
        <LeaderboardUsers numberOfTopPlayers={numberOfTopPlayers} topPlayers= {topPlayers}/>
    </div>
}
export default LeaderboardLayout;