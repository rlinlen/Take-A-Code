module.exports = (req, res, next) => {
    //console.log(req.user)
    if (req.user.TAKEPROJECT.includes(+(req.params.id))) { return next(); }

    res.send({'error':'Permission Denied'});
};