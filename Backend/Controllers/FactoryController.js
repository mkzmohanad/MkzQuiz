const asyncHandler = require("../Utils/asyncHandler");
const errorHandler = require("../Utils/errorHandler");
const shuffleData = require("../Utils/shuffleData");

exports.getAll = Model => asyncHandler(async (req, res, next) => {
    let query;
    query = Model.find().select("-__v");
    // if(query.mongooseCollection.modelName === "Question") query = query.limit(20);

    let docs = await query;
    if(query.mongooseCollection.modelName === "Question") docs = shuffleData(docs);
    
    res.status(200).json({
        status: 'success',
        results : docs.length,
        data : {
             docs
        }
    })
})

exports.addOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data : {
            doc
        }
    })
})

exports.deleteOne = Model => asyncHandler(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data : null
    })
})

exports.getOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data : {
            doc
        }
    })
})

exports.updateOne = Model => asyncHandler(async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirmation) return next(new errorHandler("you cant update your password here!!" , 401));

    const newDoc = await Model.findByIdAndUpdate(req.params.id , req.body , {
        new : true,
        runValidation : true,
    });
    
    if(!newDoc) return next(new errorHandler("there is NO document with this id to update." ,400))

    res.status(201).json({
        status : 'success',
        data : {
            data:newDoc
        }
    }) 
})