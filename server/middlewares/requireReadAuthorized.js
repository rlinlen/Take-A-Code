module.exports = (req, res, next) => {
    //console.log(req.user)
    if (req.user.READPROJECT.includes(+(req.params.projectId))) { return next(); }
    
    res.send({'error':'Permission Denied'});
};