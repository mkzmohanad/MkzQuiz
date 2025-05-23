import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../Services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUserPassword() {
    const {mutate : updateUserPassword , isPending : isUpdatingPassword} = useMutation({
        mutationFn : updatePasswordApi,
        onSuccess : () => {
            toast.success("Password has been updated successfully")
        },
        onError : () => {
            toast.error("Error occurred while updating password, please try again later and check if confirmation password is correct")
        }
    })

    return {updateUserPassword , isUpdatingPassword}
}