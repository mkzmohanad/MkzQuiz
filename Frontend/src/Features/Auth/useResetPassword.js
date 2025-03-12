import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

import {resetPassword as resetPasswordApi} from "../../Services/apiAuth"

export function useResetPassword() {
    const {resetToken} = useParams();

    const {mutate : resetPassword , isPending : isResettingPassword} = useMutation({
        mutationFn : (userResetPassword) => resetPasswordApi(userResetPassword , resetToken),
        onSuccess : () => toast.success("password has been reset successfully and confirmed your new password"),
        onError : () => toast.error("An error occurred while resetting your password, OR the reset link has expired, please try again!"),
    })
    
    return {resetPassword , isResettingPassword}
}