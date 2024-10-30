
function SingleStatistic({icon , name , data , style}) {
    return  <div className={`p-4 sm:p-5 rounded-xl bg-darkColor grid grid-cols-[4rem_1fr] sm:grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-[1rem] sm:gap-x-[2rem] gap-y-[0.4rem] ${style}`}>
    <div className="bg-blue-700 row-span-full lg:[aspect-ratio:1] rounded-full flex items-center justify-center text-2xl sm:text-3xl text-white sm:[aspect-ratio:1] md:[aspect-ratio:3/2]">
        {icon}
    </div>
    <div className="flex flex-col text-mediumColor gap-3 sm:gap-5">
        <h1 className="font-extrabold capitalize text-base xl:text-xl">
            {name} :
        </h1>
        <h3 className="text-base xl:text-2xl italic font-semibold">
            {data}
        </h3>
    </div>
</div>

}
export default SingleStatistic;