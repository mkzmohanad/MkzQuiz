const multer = require("multer")
const crypto = require("crypto");
const sharp = require("sharp")
const { S3Client , PutObjectCommand , GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const asyncHandler = require("../Utils/asyncHandler");
const errorHandler = require("../Utils/errorHandler");
const User = require("./../Models/UserModel");
const { getAll, getOne, updateOne, deleteOne } = require("./FactoryController");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyUser = process.env.ACCESS_KEY_USER;
const secretAccessKeyUser = process.env.SECRET_ACCESS_KEY_USER;

const s3 = new S3Client ({
    credentials : {
        accessKeyId : accessKeyUser,
        secretAccessKey : secretAccessKeyUser,
    },
    region : bucketRegion
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

async function accessingImageUrl(imageName) {
    const getObjectParams = {
        Bucket : bucketName,
        Key : imageName,
    }

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
}

exports.getAllUsers = getAll(User);
exports.getOneUser = getOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);

exports.getMe = asyncHandler(async (req, res, next) => {
    const currentUser = await User.findById(req.user.id);
    if(!currentUser) return next(new errorHandler("an error occurred while getting your data" , 500));

    if(currentUser.profileImage) {
        currentUser.profileImageUrl = await accessingImageUrl(currentUser.profileImage);
        await currentUser.save({ validateBeforeSave: false });
    }

    res.status(200).json({
        status: 'success',
        data : currentUser
    })
})

exports.deleteMe = asyncHandler(async (req , res , next) => {
    const {password} = req.body;
    const {email} = req.user;
    if(!password) return next(new errorHandler("Please provide your password", 400));

    const user = await User.findOne({email}).select("+password isActive");
    if(!await user.checkForPassword(password , user.password)) return next(new errorHandler("password is incorrect", 400));

    user.isActive = false;
    await user.save();
    
    res.status(204).json({
        status: "success",
        data: null
    })
})

exports.updateMe = [upload.single("image") , asyncHandler(async (req, res , next) => {
    if(req.body.password || req.body.passwordConfirmation) return next(new errorHandler("you cant update your password here!!" , 403));

    let imageName;
    if(req.file) {
        imageName = randomImageName();
        const buffer = await sharp(req.file.buffer).resize(500 , 500).toFormat("jpeg").jpeg({quality : 90}).toBuffer();
        const params = {
            Bucket : bucketName,
            Key : imageName,
            Body : buffer,
            ContentType : req.file.mimetype,
        }
        const command = new PutObjectCommand(params)
        try {
            await s3.send(command);
        } catch (error) {
            return next(new errorHandler("Failed to upload image", 500));
        }
    }

    const updatedData = {...req.body}
    if(imageName) updatedData.profileImage = imageName;

    const user = await User.findOneAndUpdate({_id: req.user.id} , updatedData , {
        new : true,
        runValidators : true
    });

    if(!user) return next(new errorHandler("an error occurred while updating your data",400));
    
    res.status(201).json({
        status : "success",
        data : {
            user
        }
    })
})]

exports.resetMe = asyncHandler(async (req, res, next) => {
    const resetData = {
        "lastScore" : 0,
        "highestScore" : 0,
        "totalMatchesPlayed" : 0,
        "totalMatchesWon" : 0,
        "totalCorrectAnswersLastMatch" : 0,
        "winRate" : 0.0,
        "totalTakenTimeLastMatch" : 0,
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id , resetData , {
        new : true,
        runValidators : true
    });
    if(!updatedUser) return next(new errorHandler("an error while updating this user" , 500));

    res.status(201).json({
        status:"success",
        data : updatedUser,
    })
})

exports.topUsersFilter = asyncHandler(async (req, res, next) => {
    const topUsers = await User.find({role : {$ne : "admin"} , totalMatchesPlayed : {$gt : 0}}).select("-__v").sort("-highestScore totalMatchesWon").limit(3); 
    res.status(200).json({
        status: "success",
        data : {
            topUsers
        }
    })
})

exports.getCurrentUserRank = asyncHandler(async (req, res, next) => {
    const sortedUsers = await User.find({role : {$ne : "admin"} , totalMatchesPlayed : {$gt : 0}}).sort("-highestScore").limit(100).select("_id highestScore");

    const userRank = sortedUsers.findIndex(user => (String(user._id) === String(req.user.id))) + 1;
    
    res.status(200).json({
        status: "success",
        data : userRank
    })
})