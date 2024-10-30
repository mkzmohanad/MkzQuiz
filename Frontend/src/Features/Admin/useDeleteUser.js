import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteUser as deleteUserApi} from "./../../Services/apiAdmin"
import toast from "react-hot-toast";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    const {mutate : deleteUser , isPending : isDeleting} = useMutation({
        mutationFn : deleteUserApi,
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("user deleted successfully")
        },
        onError : () => toast.error("error while deleting user.")
        
    })
    return {deleteUser , isDeleting}
}