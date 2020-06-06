const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in :P' });
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, 'MYSECRETKEY', async(err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in :P' })
        }

        const { userId } = payload;

        const user = await User.findById(userId)
        req.user = user;
        next();
    })
}