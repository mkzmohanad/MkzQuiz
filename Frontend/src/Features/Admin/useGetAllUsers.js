import { useQuery } from "@tanstack/react-query";
import { getAllUsers as getAllUsersApi } from "../../Services/apiAdmin";

export function useGetAllUsers() {
    const {data : users , isPending : isLoadingUsers} = useQuery({
        queryKey : ["users"],
        queryFn : getAllUsersApi,
    })

    return {users , isLoadingUsers}
}