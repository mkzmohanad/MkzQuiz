import { useForm } from "react-hook-form";

import { useToggleShowPassword } from "../../Hooks/useToggleShowPassword";

import Button from "../../UI/Button";
import Form from "../../UI/Form";
import PasswordInput from "../../UI/PasswordInput";
import { useResetPassword } from "./useResetPassword";
import MiniSpinner from "../../UI/MiniSpinner";
import { useNavigate } from "react-router-dom";

function ResetPasswordForm() { 
    const navigate = useNavigate()
    const {register , handleSubmit , formState , getValues , reset } = useForm();
    const {errors} = formState;

    const [showPassword , handleSetShowPassword] = useToggleShowPassword()
    const [showPasswordConfirmation , handleSetShowPasswordConfirmation] = useToggleShowPassword()

    const {resetPassword , isResettingPassword} = useResetPassword()

    function handleSubmitFunction(data) {
        resetPassword(data , {
            onSuccess : () => navigate("/account", { replace: true }),
            onError : () => reset(),
        })
    }

    return  <div className="flex flex-col gap-10 items-center justify-center h-fit w-full">
    <Form onSubmit={handleSubmit(handleSubmitFunction)}>
        <PasswordInput
            showPassword = {showPassword} 
            handleSetShowPassword = {handleSetShowPassword} 
            errors = {errors?.password?.message} 
            isDisabled={isResettingPassword} 
            register = {register}
            fieldName= "password"
            placeholder= "Create Password"
            requiredMessage= "this field is required"
            lengthMessage= "password must be at least 8 characters long."
        />

        <PasswordInput
            showPassword = {showPasswordConfirmation} 
            handleSetShowPassword = {handleSetShowPasswordConfirmation} 
            errors = {errors?.passwordConfirmation?.message} 
            isDisabled={isResettingPassword} 
            register = {register}
            fieldName= "passwordConfirmation"
            placeholder= "Confirm Password"
            requiredMessage= "this field is required"
            lengthMessage= "password must be at least 8 characters long."
            validate = {(value) => value===getValues().password || "confirm password need to match password"}
        />

        <Button disabled= {isResettingPassword} variation = "signInUp" size = "primary">
            {isResettingPassword ? <MiniSpinner /> : "Reset your password now"}
        </Button>
    </Form>
</div>
}
export default ResetPasswordForm;