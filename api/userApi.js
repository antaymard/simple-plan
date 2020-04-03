var User = require('../db/user');

module.exports = function (router) {
    router.get('/users', (req, res) => {
        console.log(req.query.email);

        User.findOne({ email: req.query.email }).exec((err, user) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                data: user
            })
        })
    })
}