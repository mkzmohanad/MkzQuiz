const JWT = require("jsonwebtoken");
const {promisify} = require("util");
const crypto = require("crypto")

const asyncHandler = require("../Utils/asyncHandler");
const User = require("../Models/UserModel");
const errorHandler = require("../Utils/errorHandler");
const Email = require("../Utils/emailHandler");

function signToken(user) {
    return JWT.sign({id : user.id} , process.env.JWT_SECRET_KEY , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}
function createSendToken(user , res , next) {
    const token = signToken(user);

    if(!token) return next(new errorHandler("there is a problem creating token please try again later" , 500));

    res.cookie("JWT" , token , {
        maxAge : Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000,
        httpOnly : true,
        secure : true,
        sameSite : "None",
        path : "/",
    });

    user.password = undefined;
    res.status(201).json({
        status : "success",
        token,
        data : {
            user
        }
    })
}

exports.signup = asyncHandler(async (req , res , next) => {
    const {username , email , password , passwordConfirmation} = req.body;
    if(req.body.role) return next(new errorHandler("an error occurred while signing up please try again later" , 500));

    const newUser = await User.create({
        username,
        email,
        password,
        passwordConfirmation,
    })
    const userAccountPageUrl = `${process.env.FRONTEND_LOCALHOST}/updateAccount`;
    await new Email(newUser , userAccountPageUrl).welcomeMessage();

    createSendToken(newUser, res, next);
})

exports.login = asyncHandler(async (req , res , next) => {
    const {email , password} = req.body;
    if(!email || !password) return next(new errorHandler("you need to provide your email and password" , 401));

    const user = await User.findOne({email}).select("+password");
    if(!user || !await user.checkForPassword(password , user.password)) return next(new errorHandler("email or password is incorrect, please try again." , 401));

    createSendToken(user , res , next);
})
exports.logout = asyncHandler(async(req, res, next) => {
    res.clearCookie("JWT" , {
        httpOnly : true,
        secure : true,
        sameSite : "none",
        // path : "/",
    });

    res.status(204).json({
        status: "success",
        data : null,
    })
})

exports.protectRoutes = asyncHandler(async (req , res , next) => {
    let token = req.cookies.JWT;
    if(!token) return next(new errorHandler("you can't access this endpoint please sign up or login first" , 401));
    
    const decodeJWT = await promisify(JWT.verify)(token , process.env.JWT_SECRET_KEY)
    const user = await User.findById(decodeJWT.id);
    
    if(!user) return next(new errorHandler("there is an error accessing this endpoint by this user" , 401));
    
    if(await user.isChangedPassword(decodeJWT.iat)) return next(new errorHandler("your password has been changed so the token has been updated please login again" , 401));

    req.user = user;
    next();
})

exports.restrictedTo = (allowedFor) => asyncHandler(async (req , res , next) => {
    if(!allowedFor.includes(req.user.role)) return next(new errorHandler("you are not allowed to access this endpoint!" , 401));

    next();
})

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const {oldPassword , password , passwordConfirmation} = req.body;
    if(!oldPassword || !password || !passwordConfirmation ) return next(new errorHandler("please enter old password and new password and make sure to confirm the password") , 400);

    const user = await User.findById(req.user.id).select("+password")
    if(!user) return next(new errorHandler("an error occurred while getting user data!" , 500));

    if(!await user.checkForPassword(oldPassword , user.password)) return next(new errorHandler("error while updating your password please ensure that the old password is correct" , 400));

    user.password = password;
    user.passwordConfirmation = passwordConfirmation;
    await user.save();

    createSendToken(user , res , next);
})

exports.forgetPassword = asyncHandler(async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) return next(new errorHandler("Please make sure your email is correct!" , 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave : false});

    try {
        const resetPasswordUrl = `${process.env.FRONTEND_LOCALHOST}/resetPassword/${resetToken}`;
        await new Email(user , resetPasswordUrl).resetPassword();

        res.status(200).json({
            status : "success",
            message : "Token sent successfully to your email",
        });
    }
    catch(error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiration = undefined;
        await user.save({validateBeforeSave : false});

        return next(new errorHandler("there's an error occurred while sending reset token to your email" , 500))
    }
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const hashedToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    const user = await User.findOne({passwordResetToken : hashedToken ,
    passwordResetTokenExpiration : { $gt : Date.now() } });

    if(!user) return next("Token is invalid or has expired!!" , 400);

    user.password = req.body.password
    user.passwordConfirmation = req.body.passwordConfirmation
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;
    await user.save();

    createSendToken(user , res , next);
})