import { HiOutlineChartBar } from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";

import { formateNumbers } from "../../Utils/formatNumbers";
import SingleStatistic from "./SingleStatistic";

function UserStatistics({lastScore , totalMatchesPlayed , winRate}) {

    console.log(winRate);
    return  <div className="">
                <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-[repeat(3,_0.8fr)] xl:grid-cols-[repeat(3,_1fr)] grid-rows-[1fr] gap-x-2 sm:gap-x-4 md:gap-x-5 xl:gap-x-6 gap-y-4 sm:gap-y-5 scale-90 sm:scale-95 xl:scale-100">
                    <SingleStatistic 
                        icon={<GrScorecard />} 
                        name="last score" 
                        data={`${formateNumbers(lastScore)} Points`} 
                        specialStyle="[grid-area:1_/_1_/_2_/_2]" 
                    />

                    <SingleStatistic 
                        icon={<IoGameControllerOutline />} 
                        name="total matches played" 
                        data={`${totalMatchesPlayed} Matches`} 
                        specialStyle="[grid-area:1_/_2_/_2_/_3]" 
                    />

                    <SingleStatistic 
                        icon={<HiOutlineChartBar />} 
                        name="win rate" 
                        data={`${winRate}%`} 
                        specialStyle="[grid-area:1_/_3_/_2_/_4]" 
                    />
                </div>
            </div>
}
export default UserStatistics;