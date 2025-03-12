import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiMiniAtSymbol, HiOutlineUser } from "react-icons/hi2";

import { useSignUp } from "./useSignUp";
import { useToggleShowPassword } from "../../Hooks/useToggleShowPassword";

import Form from "../../UI/Form";
import InputBox from "../../UI/InputBox";
import ErrorLabel from "../../UI/ErrorLabel";
import Input from "../../UI/Input";
import InputIcon from "../../UI/InputIcon";
import Button from "../../UI/Button";
import MiniSpinner from "../../UI/MiniSpinner";
import PasswordInput from "../../UI/PasswordInput";

function SignUpForm() {
    const [showPassword , handleSetShowPassword] = useToggleShowPassword()
    const [showPasswordConfirmation , handleSetShowPasswordConfirmation] = useToggleShowPassword()

    const {signUp , isSigningUp} = useSignUp();
    const {register , handleSubmit , formState , getValues , reset } = useForm();
    const {errors} = formState;

    const navigate = useNavigate()

    function handleSubmitFunction(data) {
        signUp(data , {
            onError : () => {
                reset()
            },
            onSuccess : () => {
                navigate("/account", { replace: true })
            }
        })
    }

    return  <div className="flex flex-col gap-10 items-center justify-center h-fit w-full">
        <Form onSubmit={handleSubmit(handleSubmitFunction)}>
            <InputBox>
                <div className="relative">
                    <Input type = "text" placeholder="Username" disabled={isSigningUp} {...register("username" , {
                        required : "this field is required",
                    })}/>
                   <InputIcon>
                       <HiOutlineUser />
                    </InputIcon>
                </div>
                <ErrorLabel error = {errors?.username?.message} />
            </InputBox>
            
            <InputBox>
                <div className="relative">
                    <Input type = "email" placeholder="Your Email" disabled={isSigningUp} {...register("email" , {
                        required : "this field is required",
                    })}/>
                    <InputIcon>
                        <HiMiniAtSymbol />
                    </InputIcon>
                </div>
                <ErrorLabel error = {errors?.email?.message} />
            </InputBox>

            <PasswordInput
                showPassword = {showPassword} 
                handleSetShowPassword = {handleSetShowPassword} 
                errors = {errors?.password?.message} 
                isDisabled={isSigningUp} 
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
                isDisabled={isSigningUp} 
                register = {register}
                fieldName= "passwordConfirmation"
                placeholder= "Confirm Password"
                requiredMessage= "this field is required"
                lengthMessage= "password must be at least 8 characters long."
                validate = {(value) => value===getValues().password || "confirm password need to match password"}
            />

            <Button disabled= {isSigningUp} variation = "signInUp" size = "primary">
                {isSigningUp ? <MiniSpinner /> : "Sign Up"}
            </Button>
        </Form>
    </div>
}
export default SignUpForm;