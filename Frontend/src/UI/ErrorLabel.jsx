function ErrorLabel({error}) {
    return  <div className="capitalize text-lightColor flex items-center justify-between">
        <p className="text-red-400 text-xs">{error}</p>
    </div>
}
export default ErrorLabel;