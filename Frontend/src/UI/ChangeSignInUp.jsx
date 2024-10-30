import { Link } from "react-router-dom";

function ChangeSignInUp({path , action ,children}) {
    return  <div className="flex gap-3 text-lightColor">{children}<Link to={`/${path}`} className="text-blue-700 underline">{action}</Link></div>
}
export default ChangeSignInUp;