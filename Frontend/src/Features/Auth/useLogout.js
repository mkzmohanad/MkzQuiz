import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "./../../Services/apiAuth";

export function useLogout() {
    const navigate = useNavigate();

    const {mutate:logout , isPending:isLoggingOut} = useMutation({
        mutationFn : logoutApi,
        onSuccess : () => {
            navigate("/login" , { replace: true })
            toast.success("you have logged out successfully, see you next time👋🏻.")
        }
    })
    return {logout , isLoggingOut}
} 