import { useQuery } from "@tanstack/react-query";

import { getTopPlayers } from "../../Services/apiLeaderboard";

export function useGetTopPlayers() {
    const {data : topPlayers , isPending : isLoading} = useQuery({
        queryKey : ["top-players"],
        queryFn : getTopPlayers
    })

    return {topPlayers , isLoading}
}
