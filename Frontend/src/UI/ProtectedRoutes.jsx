import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useUserAccount } from "../Features/User/useUserAccount";

import Loading from "./Loading";

function ProtectedRoutes({children}) {
    const navigate = useNavigate();
    const {isLoadingUser , isAuthenticated , error} = useUserAccount();
    const [shouldCheckAuth, setShouldCheckAuth] = useState(false);

    useEffect(() => {
    const timer = setTimeout(() => {
        setShouldCheckAuth(true);
    }, 3000);
        return () => clearTimeout(timer); 
    }, []);

    useEffect(function checkAuth(){
        if(!isAuthenticated && !isLoadingUser && shouldCheckAuth) {
            navigate("/login")
            toast.error(error?.response?.data?.message || error.message)
        }
    },[isAuthenticated , isLoadingUser , error , shouldCheckAuth , navigate])

    if(isLoadingUser || !shouldCheckAuth) return <Loading />

    if(isAuthenticated) return children;
}
export default ProtectedRoutes;

