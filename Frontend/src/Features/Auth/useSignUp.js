import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signUpApi } from "../../Services/apiAuth";

export function useSignUp() {
    const {mutate:signUp , isPending : isSigningUp} = useMutation({
        mutationFn : signUpApi,
        onSuccess : () => {
            toast.success("you have successfully signed up, welcome to MKZ-QUIZ a welcome message has been sent to your email 🎉.")
        },
        onError : () => {
            toast.error("there is something went wrong with your signup OR either username or email are already used before. Please try again.")
        }
    })
    return {signUp , isSigningUp}
}
