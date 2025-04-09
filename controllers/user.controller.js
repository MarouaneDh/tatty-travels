const User = require('../models/User')

const getUser = async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.params.id });
        res.send({ response: result, message: "User got with success" });
    } catch (error) {
        res.status(400).send({ message: "there is no user with this id" });
    }
};

const editUser = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Update the user fields based on the request body
        Object.assign(user, req.body);

        await user.save();

        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        res.status(400).send({ message: "Unable to update user" });
    }
};

module.exports = {
    getUser,
    editUser,
}