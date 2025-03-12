import tw from "tailwind-styled-components"

const InputFile = tw.input`
    absolute 
    inset-0 
    w-full 
    sm:w-1/2
    h-full 
    opacity-0 
    cursor-pointer 
    border-gray-500 
    border-2 
    rounded-xl 
    px-2 
    py-4
    ${(input) => input.disabled && "cursor-not-allowed opacity-30"}
`

export default InputFile