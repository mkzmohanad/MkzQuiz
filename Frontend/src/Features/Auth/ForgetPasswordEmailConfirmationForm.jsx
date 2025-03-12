import { HiMiniAtSymbol } from "react-icons/hi2";

import Form from "../../UI/Form";
import Input from "../../UI/Input";
import InputBox from "../../UI/InputBox";
import InputIcon from "../../UI/InputIcon";
import ErrorLabel from "../../UI/ErrorLabel";
import { useForm } from "react-hook-form";
import { useForgetPasswordEmailConfirmation } from "./useForgetPasswordEmailConfirmation";
import Button from "../../UI/Button";
import MiniSpinner from "../../UI/MiniSpinner";

function ForgetPasswordEmailConfirmationForm() {
    const {register , handleSubmit , formState , reset } = useForm();
    const {errors} = formState; 

    const {forgetPasswordEmailConfirmation , isConfirming} = useForgetPasswordEmailConfirmation();

    function handleSubmitFunction(data) {
        forgetPasswordEmailConfirmation(data , {
            onSettled : () => reset()
        })
    }

    return  <div className="flex flex-col gap-10 items-center justify-center h-fit w-full">
        <Form onSubmit={handleSubmit(handleSubmitFunction)}>
            <InputBox>
                <div className="relative">
                    <Input type = "email" disabled={isConfirming} placeholder ="Your Email" {...register("email" , {
                        required : "please enter your email first"
                    })}/>
                    <InputIcon>
                        <HiMiniAtSymbol />
                    </InputIcon>
                </div>
                <ErrorLabel error={errors?.email?.message} />
            </InputBox>

            <Button disabled= {isConfirming} variation = "signInUp" size = "primary">
                {isConfirming ? <MiniSpinner /> : "send reset password URL"}
            </Button>
        </Form>
    </div>
}
export default ForgetPasswordEmailConfirmationForm;