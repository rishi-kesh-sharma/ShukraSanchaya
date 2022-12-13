exports.sendResponse=(res,statusCode,payload)=>{
    res.status(statusCode).json(payload)
}