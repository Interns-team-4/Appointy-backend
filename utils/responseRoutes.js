
module.exports = function (req, res, next) {
    const { status, status_code, message } = req.locals.data;
    return res.status(status_code).send({ status: status, message: message });
}