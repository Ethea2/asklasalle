const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'authorization token required.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Token is valid, but we also check if it has expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (_id.exp < currentTimestamp) {
            throw new Error('Token expired');
        }

        req.user = await User.findOne({ _id }).select('_id');

        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json({ error: 'Token expired', expired: true });
        }
        console.log(error.message);
        res.status(401).json({ error: 'Request is not authorized.' });
    }
};

module.exports = requireAuth