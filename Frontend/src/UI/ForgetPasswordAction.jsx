import { Link } from "react-router-dom";

function ForgetPasswordAction({path , action ,children}) {
    return  <div className="flex gap-3 text-lightColor text-sm sm:text-base">{children}<Link to={`/${path}`} className="text-blue-700 underline">{action}</Link></div>
}
export default ForgetPasswordAction;