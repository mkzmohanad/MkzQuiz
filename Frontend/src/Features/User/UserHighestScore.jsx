import { formateNumbers } from "../../Utils/formatNumbers";

function UserHighestScore({highestScore , icon , name}) {
    return  <div className="flex items-center justify-center gap-5 sm:gap-10 w-full mx-auto bg-darkColor h-32 rounded-lg px-5 sm:px-12 py-3">
        <div className="flex items-center gap-3">
            <p className=" row-span-full [aspect-ratio:1] rounded-[50%] flex items-center justify-center text-4xl md:text-6xl text-accentColor">{icon}</p>
            <h1 className="text-lightColor capitalize text-xl md:text-3xl font-bold">{name} :</h1>
        </div>
        <div className="text-lightColor font-bold text-lg md:text-2xl">
            {`${formateNumbers(highestScore)} Points`}
        </div>
    </div>
}
export default UserHighestScore;