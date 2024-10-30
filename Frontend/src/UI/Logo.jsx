import logoSVG from "./../Data/logo.svg";

function Logo({size}) {
    const sizes = {
        normal : "w-32 h-32",
        small : "w-16 h-16"
    }
    return  <img className={sizes[size]} src = {logoSVG}/>
}
export default Logo;