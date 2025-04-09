const Destination = require('../models/Destination')

const createDestination = async (req, res) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).send({ msg: "Destination added with success", destination });
    } catch (error) {
        res.status(400).send({ message: "Not able to add destination" });
    }
};

const getAllDestinations = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {

        const result = await Destination.find()
            .select("-__v")
            .sort({ createdAt: -1 });

        res.send({
            response: result,
            message: "Got all destinations with success",
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Can't get destinations" });
    }
};

const getOneDestination = async (req, res) => {
    const _id = req.params.id;

    try {
        const result = await Destination.findOne({ _id }).select("-__v");

        res.send({ response: result, message: `Got destination with success` });
    } catch (error) {
        res.status(400).send({ message: "There is no destination with this id" });
    }
};

const updateDestination = async (req, res) => {
    const _id = req.params.id;

    try {
        const destination = await Destination.findById(_id);

        if (!destination) {
            return res.status(404).send({ message: "Destination not found" });
        }

        Object.assign(destination, req.body);

        await destination.save();

        res.status(200).send({ message: `Destination was updated successfully`, destination });
    } catch (error) {
        res.status(400).send({ message: "Unable to update destination" });
    }
};

const deleteDestination = async (req, res) => {
    const _id = req.params.id

    try {
        const result = await Destination.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "Destination was deleted successfully" })
            : res.status(404).send({ message: "There is no destination with this ID" })

    } catch (error) {
        res.send("Destination wasn't deleted");
    }
};

module.exports = {
    createDestination,
    getAllDestinations,
    getOneDestination,
    updateDestination,
    deleteDestination
}