import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";

import { useToggleShowPassword } from "../Hooks/useToggleShowPassword";
import { useDeleteMe } from "../Features/User/useDeleteMe";
import { useLogout } from "../Features/Auth/useLogout";
import { useUpdateUserPassword } from "../Features/Auth/useUpdateUserPassword";
import { useUpdateUserData } from "../Features/User/useUpdateUserData";

import Button from "./Button"
import PasswordInput from "./PasswordInput";
import MiniSpinner from "./MiniSpinner";

function ConfirmPasswordForDeleteAndUpdate({type , handleSetToggleModal , updatedData}) {
    const {register , handleSubmit , formState , reset} = useForm()
    const {errors} = formState;

    const {deleteMe , isDeleting} = useDeleteMe()
    const {updateUserPassword , isUpdatingPassword} = useUpdateUserPassword()
    const {updateUserData} = useUpdateUserData()
    const {logout , isLoggingOut} = useLogout()

    const [showPassword , handleSetShowPassword] = useToggleShowPassword();

    function handleSubmitConfirmPasswordForDeleteAndUpdate(data) {
        if(type === "delete") {
            deleteMe(data , {
                onSuccess : () => {
                    logout();
                },
                onError : () => reset()
            });
        }
        else if(type === "updateNormalData") {
            updateUserData(updatedData)
        } 
        else {
            const {password} = data;
            const oldPassword = password;
            updateUserPassword({"oldPassword" : oldPassword ,  ...updatedData} ,{ onSuccess : () => handleSetToggleModal()})
        }
    }

    return  <div className="w-full sm:w-5/6 lg:w-2/3 h-1/2 relative">
        <div className="absolute right-0 text-5xl p-5 ">
            <IoMdCloseCircle className="cursor-pointer" onClick={handleSetToggleModal}/>
        </div>
        <form onSubmit={handleSubmit(handleSubmitConfirmPasswordForDeleteAndUpdate)} className=" flex flex-col justify-center gap-5 bg-mediumColor pt-16 pb-8 px-4 sm:px-10 z-30 rounded-lg">
            <h1 className = "font-extrabold text-darkestColor text-2xl sm:text-3xl text-center capitalize">{`Confirm your password for ${type === "delete" ? "delete" : "update"}`}</h1>
            <p className="text-darkestColor sm:text-lg text-center tracking-wider">{`Please enter your password to confirm that you want to ${type === "delete" ? "delete your account" : "update your data"}.`}</p>
            <PasswordInput
                    showPassword = {showPassword} 
                    handleSetShowPassword = {handleSetShowPassword} 
                    errors = {errors?.password?.message} 
                    isDisabled={isDeleting || isLoggingOut || isUpdatingPassword} 
                    register = {register}
                    fieldName= "password"
                    placeholder= "Confirm Your Password"
                    requiredMessage= "please enter your password to confirm it"
                    lengthMessage= "password must be at least 8 characters long."
                />
            <div className="flex items-center w-full justify-center">
                <Button size="primary" variation="danger" disabled={isDeleting || isLoggingOut || errors?.password}>
                    {isDeleting || isLoggingOut || isUpdatingPassword ? <MiniSpinner /> : type === "delete" ? "delete my account" : "update data now"}
                </Button>
            </div>
        </form>
    </div>
}
export default ConfirmPasswordForDeleteAndUpdate;