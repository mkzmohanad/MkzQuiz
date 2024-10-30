const asyncHandler = require("../Utils/asyncHandler");
const errorHandler = require("../Utils/errorHandler");
const settings = require("./../Models/SettingsModel");

exports.getSettings = asyncHandler(async (req,res,next) => {
    const allSettings = await settings.findOne({});
    if(!allSettings) return next(new errorHandler("an error occurred while getting settings" , 500));

    res.status(200).json({
        status : "success",
        data : allSettings
    })

})

exports.updateSetting = asyncHandler(async(req , res , next) => {
    const updatedSettings = await settings.findOneAndUpdate({} , req.body , {
        runValidators : true,
        new : true,
    });
    if(!updatedSettings) return next(new errorHandler("an error occurred while updating settings" , 500))

    res.status(201).json({ 
        status : "success",
        data : updatedSettings
    })
})