import { HiEye, HiEyeSlash } from "react-icons/hi2";

function ToggleShowPassword({showPassword , handleSetShowPassword}) {

    return <button type="button" onClick={handleSetShowPassword} className="text-lightColor absolute top-1/2 right-4 transform -translate-y-1/2">
        {!showPassword ? <HiEyeSlash /> : <HiEye /> }
    </button>

}
export default ToggleShowPassword;