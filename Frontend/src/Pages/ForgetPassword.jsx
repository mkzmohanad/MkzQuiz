import ForgetPasswordEmailConfirmationForm from "../Features/Auth/ForgetPasswordEmailConfirmationForm";
import Logo from "../UI/Logo";
import SignInUpHeading from "../UI/SignInUpHeading";

function ForgetPassword() {
    return  <div className="h-vh sm:h-dvh flex items-center justify-center bg-darkestColor">
        <div className="flex flex-col gap-5 items-center text-center bg-darkColor px-2 py-5 mt-16 sm:mt-0 sm:p-7 sm:rounded-xl w-[500px]">
            <Logo size ="normal"/>
            <SignInUpHeading>Forgot your password!</SignInUpHeading>
            <ForgetPasswordEmailConfirmationForm />
        </div>
    </div>
}
export default ForgetPassword;