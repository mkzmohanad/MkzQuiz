import { useMutation } from "@tanstack/react-query";
import {deleteMe as deleteMeApi} from "./../../Services/apiUsers"
import toast from "react-hot-toast";

export function useDeleteMe() {
    const {mutate : deleteMe , isPending : isDeleting} = useMutation({
        mutationFn : deleteMeApi,
        onSuccess : () => {
            toast.success("Your account has been deleted.")
        },
        onError : () => toast.error("An error has occurred while deleting your account, please check if your password is correct and try again")
    })

    return {deleteMe , isDeleting}
}