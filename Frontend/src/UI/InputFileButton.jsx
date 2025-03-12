function InputFileButton({disabled , imageUploaded , children}) {

    const mainStyle = `cursor-pointer transition-all duration-300 w-full sm:w-1/2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 p-2 text-center ${disabled ? "hover:bg-gray-700" : "hover:bg-gray-800"} ${imageUploaded ? "!bg-green-600 !border-green-600" : ""} `
    const disabledStyle = "!cursor-not-allowed opacity-50 "

    return  <button disabled = {disabled} className={`${disabled && disabledStyle} ${mainStyle}`}>{children}</button>
}
export default InputFileButton;