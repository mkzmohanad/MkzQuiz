import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgetPassword } from "../../Services/apiAuth";

export function useForgetPasswordEmailConfirmation() {
    const {mutate : forgetPasswordEmailConfirmation , isPending : isConfirming} = useMutation({
        mutationFn : forgetPassword,
        onSuccess : () => toast.success("reset password URL send successfully to your email"),
        onError : () => toast.error("an error occurred while sending your URL to your email"),
    })

    return {forgetPasswordEmailConfirmation , isConfirming}
}