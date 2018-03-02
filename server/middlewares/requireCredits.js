module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: "You have no credits!" });
    }
    // 400-499 user done something wrong | Look code definitions
    next();
};
