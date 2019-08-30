module.exports = (req, res, next) => {
    if (req.user.ROLE.includes('admin')) { return next(); }
    return res.status(401).send({ error: 'Permission Denied!' });
};