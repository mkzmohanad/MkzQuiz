import  "./../Styles/globalStyles.css";
import { BiLoaderAlt } from "react-icons/bi";


function MiniSpinner() {
    return  <div className="miniSpinner flex items-center justify-center"><BiLoaderAlt className="w-7 h-7" /></div>
}
export default MiniSpinner