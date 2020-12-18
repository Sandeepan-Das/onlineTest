const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userModel = require("../Models/UserLogin")

const auth = async (req, res, next) => {
    try {
        // console.log(req.body)
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token,"sandy")
    
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        // console.log(req.user)
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;