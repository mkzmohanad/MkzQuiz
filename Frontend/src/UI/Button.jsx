
function Button({size , variation , disabled , onClick , children}) {
    const sizes = {
        primary : "py-2 rounded-lg text-lg capitalize text-lightColor"
    }

    const variations = {
        signInUp : `bg-blue-600 ${disabled ? "hover:bg-blue-600" : "hover:bg-blue-700"}`,
        start : `bg-blue-600 ${disabled ? "hover:bg-blue-600" : "hover:bg-blue-700"} w-full xl:w-1/2 h-fit flex items-center justify-center !text-2xl gap-1`,
        back : "bg-gray-700 hover:bg-gray-800 w-full w-full xl:w-1/2 h-fit flex items-center justify-center !text-2xl gap-1",
        confirm : `w-full sm:w-2/3 md:w-2/3 flex items-center justify-center gap-1 bg-green-600 ${disabled ? "hover:bg-green-600" : "hover:bg-green-700"}`,
        next : `w-full sm:w-3/6 flex items-center justify-center bg-blue-600 ${disabled ? "hover:bg-blue-600" : "hover:bg-blue-700"} px-5 `,
        finish : `w-full sm:w-1/2 flex items-center justify-center gap-1 bg-green-600 ${disabled ? "hover:bg-green-600" : "hover:bg-green-700"} !text-2xl`,
        danger : "w-full sm:w-2/3 bg-red-500 ",
        reset : `w-1/4 flex items-center justify-center bg-gray-700 ${disabled ? "hover:bg-gray-700" : "hover:bg-gray-800"} hover:w-1/3`,
        create : `w-full sm:w-2/3 bg-blue-600 ${disabled ? "hover:bg-blue-600" : "hover:bg-blue-700"} `,
        edit : `w-full sm:w-2/3 bg-gray-700 ${disabled ? "hover:bg-gray-700" : "hover:bg-gray-800"}  `
    }

    const mainStyles = "cursor-pointer transition-all duration-300"
    const disabledStyle = "!cursor-not-allowed opacity-50 "

    return <button onClick={onClick} disabled = {disabled} className={`${disabled && disabledStyle} ${mainStyles} ${sizes[size]} ${variations[variation]}`}>{children}</button>
}

export default Button;