import LeaderboardLayout from "../Features/LeaderBoard/LeaderboardLayout";
import Header from "../UI/Header";

function LeaderBoard() {
    return  <>
        <Header />
        <main className="flex items-center justify-center h-dvh px-10 2xl:px-0">
            <LeaderboardLayout />
        </main>
    </>
}
export default LeaderBoard;