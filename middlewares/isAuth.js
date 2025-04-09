const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers["authorization"];

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(400).send({ errors: [{ msg: "Unauthorized - Bearer token missing" }] });
        }

        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            return res.status(400).send({ errors: [{ msg: "Unauthorized - Token missing" }] });
        }

        const decoded = await jwt.verify(token, process.env.secret);

        const user = await User.findById(decoded._id).select("-password -phoneNumber -__v");

        if (!user) {
            return res.status(400).send({ errors: [{ msg: "Unauthorized - User not found" }] });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).send({ errors: [{ msg: "Server error - Unauthorized" }] });
    }
};
