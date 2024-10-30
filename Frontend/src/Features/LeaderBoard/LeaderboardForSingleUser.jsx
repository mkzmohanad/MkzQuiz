import { FaUserCircle } from "react-icons/fa";

function LeaderboardForSingleUser({rank , image , username , totalMatchesWon , highestScore}) {

    return  <div className="flex flex-col md:flex-row w-full h-fit text-lightColor px-2 lg:px-7 items-center gap-2 lg:gap-5">
        <div className="flex">
            <div>
            <h3 className="text-bold text-4xl">{rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "3️⃣" : rank}</h3>  
            </div>
            <div>
                {image ? <image src={image} alt={`image of the user ${username}`} /> : <FaUserCircle className="text-4xl" />}
            </div>
        </div>
        <div className="bg-mediumColor text-darkestColor py-3 px-2 md:px-6 rounded-lg flex items-center justify-between w-full font-bold flex-col md:flex-row gap-5 md:gap-0">
            <p className="capitalize text-xl md:text-base lg:text-lg">{username}</p>
            <p className=" uppercase text-xs lg:text-base">{`Won a total of `}<span className="underline font-extrabold">{totalMatchesWon}</span> matches</p>
            <p className=" uppercase text-xs lg:text-base">{`highest score achieved: `}<span className="underline font-extrabold">{highestScore}</span></p>
        </div>
    </div>
}
export default LeaderboardForSingleUser;