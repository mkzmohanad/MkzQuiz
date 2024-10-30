import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { HiMiniAtSymbol, HiOutlineUser } from "react-icons/hi2";
import { useState } from "react";

import { useToggleShowPassword } from "../../Hooks/useToggleShowPassword";
import { useToggleModal } from "../../Hooks/useToggleModal";
import { useUpdateUserData } from "../User/useUpdateUserData";
import { useUserAccount } from "../User/useUserAccount";
import { useUpdateUserPassword } from "./useUpdateUserPassword";

import InputBox from "../../UI/InputBox";
import Input from "../../UI/Input";
import InputIcon from "../../UI/InputIcon";
import ErrorLabel from "../../UI/ErrorLabel";
import Button from "../../UI/Button";
import PasswordInput from "../../UI/PasswordInput";
import DeleteAndUpdateConfirmation from "../../UI/DeleteAndUpdateConfirmation";
import ConfirmModal from "../../UI/ConfirmModal";
import Loading from "./../../UI/Loading";
import MiniSpinner from "../../UI/MiniSpinner";

function UpdateUserData() {
    const [updatedDataHolder , setUpdatedDataHolder] = useState("")
    const {user , isLoading} = useUserAccount()

    
    const {register:registerAccountData , formState : formStateAccountData , handleSubmit : handleSubmitAccountData , reset:resetUserData} = useForm();
    const {errors : errorsAccountData} = formStateAccountData;
    
    const {updateUserData , isUpdating} = useUpdateUserData()
    const {isUpdating : isUpdatingPassword} = useUpdateUserPassword()

    const {register : registerAccountUpdatePassword , formState:formStateAccountUpdatePassword , handleSubmit:handleSubmitAccountUpdatePassword , getValues : getValuesAccountUpdatePassword , reset:resetUserPassword} = useForm();
    const {errors : errorsAccountUpdatePassword} = formStateAccountUpdatePassword;

    const [showPassword , handleSetShowPassword] = useToggleShowPassword()
    const [showPasswordConfirmation , handleSetShowPasswordConfirmation] = useToggleShowPassword()

    const {toggleModal : toggleUpdateUserDateMeModal , handleSetToggleModal : handleSetToggleUpdateUserDateMeModal} = useToggleModal();
    const {toggleModal : toggleUpdatePasswordModal , handleSetToggleModal : handleSetToggleUpdatePasswordModal} = useToggleModal()

    let type;

    function handleUpdateUserData() {
        updateUserData(updatedDataHolder , {
            onSuccess : () => {
                toast.success("your data is updated successfully!");
                resetUserData()
                resetUserPassword()
            }
        })
        setUpdatedDataHolder("")
    }

    function handleSubmitUpdateUserData(data) {
        let updatedData ; 
        if(data.username && data.email) updatedData =   data
        if(data.username && !data.email) updatedData = {"username" : data.username}
        if(!data.username && data.email) updatedData = {"email" : data.email}

        setUpdatedDataHolder(updatedData)
        handleSetToggleUpdateUserDateMeModal()
        type = "updateNormalData"
    }

    function handleSubmitUpdateUserPassword(data) {
        setUpdatedDataHolder(data)
        handleSetToggleUpdatePasswordModal();
        type = "updatePasswordData"
    }
    
    if(isUpdating || isLoading || isUpdatingPassword) return <Loading />
    
    const {username , email} = user.data.data;
    console.log(isUpdatingPassword)

    return  <>
            {toggleUpdatePasswordModal ? <DeleteAndUpdateConfirmation type = {type} handleSetToggleModal = {handleSetToggleUpdatePasswordModal} updatedData={updatedDataHolder}/> : ""}

            {toggleUpdateUserDateMeModal ? <ConfirmModal 
            handleSetToggleModal = {handleSetToggleUpdateUserDateMeModal} 
            warningMessage="are you sure you want to update your data? " 
            actionName ="yes, update now"
            functionToPerform={handleUpdateUserData}/> : ""}

        <div className=" pt-32 px-3 sm:px-12 lg:px-32 pb-12 bg-darkestColor space-y-12 w-full">
            <div className="bg-darkColor p-5 sm:p-10 flex flex-col items-center gap-10 rounded-3xl">
                <h1 className="uppercase font-bold sm:text-xl md:text-3xl text-lightColor">Update Account Data</h1>
                <form className=" flex flex-col items-center gap-7 w-full " onSubmit={handleSubmitAccountData(handleSubmitUpdateUserData)}>
                <div  className="w-full lg:w-1/2 flex flex-col gap-7" >
                    <InputBox>
                        <div className="relative">
                            <Input type = "text" placeholder={username} disabled={isUpdating} {...registerAccountData("username" , {})}/>
                        <InputIcon>
                            <HiOutlineUser />
                            </InputIcon>
                        </div>
                        <ErrorLabel error = {errorsAccountData?.username?.message} />
                    </InputBox>
                    
                    <InputBox>
                        <div className="relative">
                            <Input type = "email" placeholder={email} disabled={isUpdating} {...registerAccountData("email" , {})}/>
                            <InputIcon>
                                <HiMiniAtSymbol />
                            </InputIcon>
                        </div>
                        <ErrorLabel error = {errorsAccountData?.email?.message} />
                    </InputBox>
                </div>

                <div className="flex items-center justify-center xl:justify-end gap-6 w-full xl:w-1/2">
                    <Button size="primary" variation="next" disabled={isUpdatingPassword || isUpdating}>{isUpdating ? <MiniSpinner /> : "Update Data"}</Button>
                </div>
                </form>
            </div>

            <div className="bg-darkColor p-5 sm:p-10 flex flex-col items-center gap-10 rounded-3xl">
                <h1 className="uppercase font-bold sm:text-xl md:text-3xl text-lightColor">Update User Password</h1>
                <form className=" flex flex-col items-center gap-7 w-full" onSubmit={handleSubmitAccountUpdatePassword(handleSubmitUpdateUserPassword)}>
                <div  className="w-full lg:w-1/2 flex flex-col gap-7">
                <PasswordInput
                    showPassword = {showPassword} 
                    handleSetShowPassword = {handleSetShowPassword} 
                    errors = {errorsAccountUpdatePassword?.password?.message} 
                    isDisabled={isUpdatingPassword} 
                    register = {registerAccountUpdatePassword}
                    fieldName= "password"
                    placeholder= "Create Password"
                    requiredMessage= "this field is required"
                    lengthMessage= "password must be at least 8 characters long."
                />

                <PasswordInput
                    showPassword = {showPasswordConfirmation} 
                    handleSetShowPassword = {handleSetShowPasswordConfirmation} 
                    errors = {errorsAccountUpdatePassword?.passwordConfirmation?.message} 
                    isDisabled={isUpdatingPassword} 
                    register = {registerAccountUpdatePassword}
                    fieldName= "passwordConfirmation"
                    placeholder= "Confirm Password"
                    requiredMessage= "this field is required"
                    lengthMessage= "password must be at least 8 characters long."
                    validate = {(value) => value===getValuesAccountUpdatePassword().password || "confirm password need to match password"}
                />
                </div>

                <div className="flex items-center justify-center xl:justify-end gap-6 w-full xl:w-1/2">
                    <Button size="primary" variation="next" disabled={isUpdatingPassword || isUpdating}>{isUpdatingPassword ? <MiniSpinner /> : "Update password"}</Button>
                </div>
                </form>
            </div>
        </div>
    </>
}
export default UpdateUserData;

