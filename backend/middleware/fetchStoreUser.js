const jwt = require('jsonwebtoken');
require('dotenv').config();
const StoreUser = require('../models/StoreUser.model')


const secret = process.env.JWT_SECRET

const fetchStoreUser = async (req, res, next) => {
    const token = req.header('Token');
    if(!token){
        return res.status(400).json({error: "invalid Token!"});
    }

    try {
        const data = jwt.verify(token, secret);
        const user = await StoreUser.findById(data.user.id).select('-password');
        if(!user){
            return res.status(400).json({error: "invalid Token!"});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401)
    }
}

module.exports = fetchStoreUser;