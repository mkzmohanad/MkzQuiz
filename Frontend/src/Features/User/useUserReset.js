import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetMe } from "../../Services/apiUsers";

export function useUserReset() {
    const queryClient = useQueryClient();

    const {mutate : reset , isPending : isResetting} = useMutation({
        mutationFn : resetMe,
        onSuccess : () => {
            toast.success("All your data has been reset successfully."),
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError : () => {
            toast.error("Something went wrong while resetting your data, please try again later.")
        }
    })

    return {reset , isResetting}
}