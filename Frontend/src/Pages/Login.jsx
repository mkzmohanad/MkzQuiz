import LoginForm from "../Features/Auth/LoginForm";
import ChangeSignInUp from "../UI/ChangeSignInUp";
import HeadingOR from "../UI/HeadingOR";
import Logo from "../UI/Logo";
import SignInUpHeading from "../UI/SignInUpHeading";

function Login() {
    return <div className="h-vh sm:h-dvh flex items-center justify-center bg-darkestColor ">
    <div className="flex flex-col gap-5 items-center text-center bg-darkColor px-2 py-5 mt-16 sm:mt-0 sm:p-7 sm:rounded-xl w-[500px]">
        <Logo size ="normal"/>
        <SignInUpHeading>welcome back</SignInUpHeading>
        <LoginForm />
       <HeadingOR /> 
       <ChangeSignInUp path = "signup" action = "Sign Up">{"Don't have an account yet?"}</ChangeSignInUp>
    </div>
</div>
}
export default Login;