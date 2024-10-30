import { useQueryClient, useMutation } from "@tanstack/react-query";

import {updateUserDate as updateUserDateApi} from "./../../Services/apiUsers"

export function useUpdateUserData() {
    const queryClient = useQueryClient();

    const {mutate : updateUserData , isPending : isUpdating} = useMutation({
        mutationFn : updateUserDateApi,
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
    })
    
    return {updateUserData , isUpdating}
}