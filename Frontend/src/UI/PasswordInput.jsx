import { HiOutlineLockClosed } from "react-icons/hi2";

import Input from "./Input";
import InputBox from "./InputBox";
import ErrorLabel from "./ErrorLabel";
import InputIcon from "./InputIcon";
import ToggleShowPassword from "./ToggleShowPassword";

function PasswordInput({showPassword , handleSetShowPassword , isDisabled , errors , register , placeholder , fieldName , requiredMessage , lengthMessage, ...extraValidations}) {

    return  <InputBox>
    <div className="relative">
        <Input type = {showPassword ? "text" : "password"} disabled={isDisabled} placeholder = {placeholder} {...register(`${fieldName}` , {
            required : requiredMessage,
            minLength : {
                value : 8,
                message : lengthMessage
            },
            ...(extraValidations),
        })}/>
        <InputIcon>
            <HiOutlineLockClosed />
        </InputIcon>
        <ToggleShowPassword showPassword = {showPassword} handleSetShowPassword = {handleSetShowPassword} />
    </div>
        <ErrorLabel error={errors} />
    </InputBox>
}
export default PasswordInput;