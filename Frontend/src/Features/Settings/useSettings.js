import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../Services/apiSettings";

export function useSettings() {
    const {data : settings , isPending : isLoadingSettings} = useQuery({
        queryKey : ["settings"],
        queryFn : getSettings
    })

    return {settings , isLoadingSettings};
}