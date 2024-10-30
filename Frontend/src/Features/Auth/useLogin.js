import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { loginApi } from "../../Services/apiAuth";

export function useLogin() {
    const {mutate : login , isPending : isLoggingIn} = useMutation({ 
        mutationFn : loginApi,
        onSuccess : () => {
            toast.success("you have logged in successfully.");  
        },
        onError : () => {
            toast.error("an error occurred while logging in, please try again.")
        }
    })
    return {login , isLoggingIn}
}