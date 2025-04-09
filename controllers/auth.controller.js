const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
    } = req.body;
    try {
        //find if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).send({ errors: [{ msg: "User already exists" }] });
        }

        //create a new user
        user = new User({
            firstName,
            lastName,
            email,
            password,
            role,
        });

        //hash password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

        //save the new user
        await user.save();

        //sign in the user
        const payload = {
            _id: user._id,
        };

        const token = await jwt.sign(payload, process.env.secret);

        res.status(201).send({ msg: "Registered and logged in with success", user, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "server error" }] });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                errors: [{ msg: "This user doesn't exist" }],
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                errors: [{ msg: "Wrong password" }],
            });
        }

        //sign the user in
        const payload = {
            _id: user._id,
        };

        const token = await jwt.sign(payload, process.env.secret);

        res.status(200).send({ msg: "Logged in with success", user, token });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "Server error" }] });
    }
}

module.exports = {
    register,
    login,
};