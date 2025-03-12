import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiMiniAtSymbol } from "react-icons/hi2";

import { useLogin } from "./useLogin";
import { useToggleShowPassword } from "../../Hooks/useToggleShowPassword";

import Form from "../../UI/Form";
import InputBox from "../../UI/InputBox";
import ErrorLabel from "../../UI/ErrorLabel";
import Input from "../../UI/Input";
import InputIcon from "../../UI/InputIcon";
import Button from "../../UI/Button";
import MiniSpinner from "../../UI/MiniSpinner";
import PasswordInput from "../../UI/PasswordInput";

function LoginForm() {
    const navigate = useNavigate()
    const [showPassword , handleSetShowPassword] = useToggleShowPassword();
    
    const {register ,handleSubmit , formState , reset } = useForm();
    const {errors} = formState; 

    const {login , isLoggingIn} = useLogin();

    function handleSubmitFunction(data) {
        login(data , {
            onSuccess : () => {
                navigate("/account", { replace: true })
            },
            onError : () => {
                reset()
            }
        })
    }

    return  <div className="flex flex-col gap-10 items-center justify-center h-fit w-full">
        <Form onSubmit={handleSubmit(handleSubmitFunction)}>
            <InputBox>
                <div className="relative">
                    <Input type = "email" disabled={isLoggingIn} placeholder ="Your Email" {...register("email" , {
                        required : "please enter your email first"
                    })}/>
                    <InputIcon>
                        <HiMiniAtSymbol />
                    </InputIcon>
                </div>
                <ErrorLabel error={errors?.email?.message} />
            </InputBox>

            <PasswordInput
                showPassword = {showPassword} 
                handleSetShowPassword = {handleSetShowPassword} 
                errors = {errors?.password?.message} 
                isDisabled={isLoggingIn} 
                register = {register}
                fieldName= "password"
                placeholder= "Enter Password"
                requiredMessage= "please enter your password first"
                lengthMessage= "password must be at least 8 characters long."
            />

            <Button disabled= {isLoggingIn} variation = "signInUp" size = "primary">
                {isLoggingIn ? <MiniSpinner /> : "Log In"}
            </Button>
        </Form>
    </div>
}
export default LoginForm;