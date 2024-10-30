import { Navigate, Outlet } from "react-router-dom";
import { useUserAccount } from "../Features/User/useUserAccount";
import Loading from "./Loading";

function AdminRoutes() {
    
    const {user , isLoadingUser} = useUserAccount();
    
    if(isLoadingUser) return <Loading />
    const {role} = user.data.data
    console.log(role)

    if(role !== "admin") return <Navigate to = "/account" replace />

    return  <Outlet /> 
}
export default AdminRoutes;