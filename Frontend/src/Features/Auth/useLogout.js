import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "./../../Services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();

    const {mutate:logout , isPending:isLoggingOut} = useMutation({
        mutationFn : logoutApi,
        onSuccess : () => {
            navigate("/login")
            toast.success("you have logged out successfully.")
        }
    })
    return {logout , isLoggingOut}
} 