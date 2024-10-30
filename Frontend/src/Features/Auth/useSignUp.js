import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signUpApi } from "../../Services/apiAuth";

export function useSignUp() {
    const {mutate:signUp , isPending : isSigningUp} = useMutation({
        mutationFn : signUpApi,
        onSuccess : () => {
            toast.success("you have successfully signed up.")
        },
        onError : () => {
            toast.error("there is something went wrong with your signup. Please try again.")
        }
    })
    return {signUp , isSigningUp}
}
