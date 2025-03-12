import ResetPasswordForm from "../Features/Auth/ResetPasswordForm";
import Logo from "../UI/Logo";
import SignInUpHeading from "../UI/SignInUpHeading";

function ResetPassword() {
    return  <div className="h-vh sm:h-dvh flex items-center justify-center bg-darkestColor">
        <div className="flex flex-col gap-5 items-center text-center bg-darkColor px-2 py-5 mt-16 sm:mt-0 sm:p-7 sm:rounded-xl w-[500px]">
        <Logo size ="normal"/>
        <SignInUpHeading>Reset your password</SignInUpHeading>
        <ResetPasswordForm />
    </div>
</div>
}
export default ResetPassword;