import SignUpForm from "../Features/Auth/SignUpForm";
import ChangeSignInUp from "../UI/ChangeSignInUp";
import HeadingOR from "../UI/HeadingOR";
import Logo from "../UI/Logo";
import SignInUpHeading from "../UI/SignInUpHeading";

function SignUp(){
    return  <div className="h-vh sm:h-dvh flex items-center justify-center bg-darkestColor">
        <div className="flex flex-col gap-5 items-center text-center h-full bg-darkColor px-2 py-5 mt-16 sm:mt-0 sm:p-7 sm:rounded-xl w-[500px]">
            <Logo size ="normal"/>
            <SignInUpHeading>Create new account</SignInUpHeading>
            <SignUpForm />
            <HeadingOR /> 
            <ChangeSignInUp path = "login" action = "Log In">{"Already have an account?"}</ChangeSignInUp>
        </div>
    </div>
}
export default SignUp;