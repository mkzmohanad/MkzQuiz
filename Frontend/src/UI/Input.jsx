import tw from "tailwind-styled-components"

const Input = tw.input`
    px-10
    py-[9px]
    text-mediumColor 
    border-gray-500 
    border-2 
    bg-darkColor 
    outline-none 
    rounded-md 
    relative
    w-full
    ${(input) => input.disabled && "cursor-not-allowed opacity-30"}
    `

export default Input;
