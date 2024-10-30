import { PiRankingFill } from "react-icons/pi";

function UserRank({rank}) {
    return  <div className="text-lightColor bg-darkColor p-8 rounded-lg text-center flex flex-col gap-10">
        <h1 className="font-bold text-2xl sm:text-4xl underline flex flex-col sm:flex-row items-center justify-center gap-2 capitalize">your current rank: <span className="text-6xl"><PiRankingFill /></span></h1>
        <p className="text-3xl sm:text-5xl italic">{!rank ? "Not ready yet to have a rank" : `#${rank}`}</p>
    </div>
}
export default UserRank;