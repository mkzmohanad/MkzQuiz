import { Navigate, Outlet } from "react-router-dom";
import { useUserAccount } from "../Features/User/useUserAccount";
import Loading from "./Loading";

function UserRoutes() {

    const {user , isLoadingUser} = useUserAccount();
    
    if(isLoadingUser) return <Loading />
    const {role} = user.data.data

    if(role !== "user") return <Navigate to = "/admin" replace />

    return  <Outlet />
}
export default UserRoutes;