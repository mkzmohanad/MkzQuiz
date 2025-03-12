const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const Settings = require("./SettingsModel");

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: [true , "Please you need to provide a username."],
        unique : true,
    },
    email : {
        type : String,
        required: [true , "An email need to be provided."],
        unique: true,
        lowercase : true,
        validate : [validator.isEmail , "please provide a valid email"]
    },
    password : {
        type : String,
        required: [true , "password is required and must be provided."],
        minLength: [8 , "your password must be at least 8 characters long."],
        select : false,
    },
    passwordConfirmation : {
        type : String,
        required: [true , "passwordConfirmation is required and must be provided and matches the password."],
        validate: {
            validator : function(value) {
                return value === this.password;
            } 
        }
    },
    profileImage : {
        type : String,
    },
    profileImageUrl : {
        type : String,
    },
    isActive : {
        type : Boolean,
        default: true,
        select : false,
    },
    role : {
        type : String,
        enum : ["admin" , "user"],
        default : "user",
    },
    startGame : {
        type : Boolean,
        required: [true , "need to specify if the user started the game or not."],
        default : false,
    },
    lastScore : {
        type : Number,
        default : 0,
    },
    highestScore : {
        type : Number,
        default : 0,
    },
    totalMatchesPlayed : {
        type : Number,
        default : 0,
    },
    totalMatchesWon : {
        type : Number,
        default : 0,
    },
    totalCorrectAnswersLastMatch : {
        type : Number,
        default : 0,
    },
    winRate : {
        type : Number,
        default : 0.0,
        set : value => Math.round(value * 10) / 10 
    },
    isWin : {
        type : "string",
        enum : ["win" , "lose" , "not yet"], 
        default : "not yet",
    },
    totalTakenTimeLastMatch : {
        type : Number,
        default : 0,
    },
    createdAt :  {
        type : Date,
        default : Date.now(),
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetTokenExpiration : Date,
})

userSchema.index({score : 1 , totalTakenTime : -1});

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next();
    if(this.isModified("password") && !this.isNew) this.passwordChangedAt = Date.now();

    this.password = await bcrypt.hash(this.password , 16);
    this.passwordConfirmation = undefined;
    next();
});

userSchema.pre(/^find/ , function(next) {
    this.find({isActive : {$ne : false}})
    next()
})

userSchema.pre("findOneAndUpdate" , async function(next) {
    const update = this.getUpdate()
    const doc = await this.model.findOne(this.getQuery());

    if(!doc) return next();

    if(update.startGame) update.totalTakenTimeLastMatch = Date.now();

    if(doc.startGame && !update.startGame && update.lastScore>=0 && update.isWin && update.totalCorrectAnswersLastMatch>=0) {
        update.startGame = false 
        const convertTimeToSeconds = (Date.now() - doc.totalTakenTimeLastMatch)
        update.totalTakenTimeLastMatch = convertTimeToSeconds / 1000;
        if(update.lastScore > doc.highestScore) update.highestScore = update.lastScore;

        update.totalMatchesPlayed = (doc.totalMatchesPlayed || 0) + 1
        try {
            const settings = await Settings.findOne();
            if(settings) {
                if(update.isWin === "win") update.totalMatchesWon = (doc.totalMatchesWon || 0) + 1 
            }
            update.winRate = ((update.totalMatchesWon || doc.totalMatchesWon) / update.totalMatchesPlayed) * 100;
        }
        catch(error) {
            throw new Error(`Failed to update match stats: ${error.message}`);
        }
    }
    next();
})

userSchema.methods.checkForPassword = async function (normalPassword , encryptedPassword)  {
    return await bcrypt.compare(normalPassword, encryptedPassword);
}
userSchema.methods.isChangedPassword = async function (tokenCreatedTime) {
    if(this.passwordChangedAt) {   
        passwordChangedAtTamp = this.passwordChangedAt.getTime() / 1000;
        return passwordChangedAtTamp > tokenCreatedTime;
    }
    return false;
}
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpiration = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User' , userSchema);
module.exports = User;