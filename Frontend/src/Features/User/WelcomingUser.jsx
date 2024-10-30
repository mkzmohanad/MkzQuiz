import Loading from "../../UI/Loading";
import { useUserAccount } from "./useUserAccount";

function WelcomingUser() {
    const {user , isLoading} = useUserAccount();
    const {username} = user.data.data;

    if(isLoading) return <Loading />

    return  <h1 className="mt-24 capitalize text-lightColor font-bold tracking-wide text-2xl sm:text-4xl">Welcome {username}🎉</h1>
}
export default WelcomingUser;