const Destination = require('../models/Destination')
const Images = require('../models/Images');

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
    try {
        if (req.body.token) {
            const result = await Destination.find()
                .select("-__v")
                .sort({ createdAt: -1 });
            res.send({
                response: result,
                message: "Got all destinations with success",
            });
        } else {
            const result = await Destination.find({ isLive: true })
                .select("-__v")
                .sort({ createdAt: -1 });
            res.send({
                response: result,
                message: "Got all destinations with success",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Can't get destinations" });
    }
};

const getFeaturedDestinations = async (req, res) => {
    try {
        const result = await Destination.find({ featured: true, isLive: true })
            .select("-__v")
            .sort({ createdAt: -1 })
            .exec();

        res.send({
            response: result,
            message: "Got featured destinations with success",
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Can't get featured destinations" });
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
    const _id = req.params.id;

    try {
        const destination = await Destination.findById(_id);

        if (!destination) {
            return res.status(404).send({ message: "There is no destination with this ID" });
        }

        const imageIdsToDelete = [];

        // Add main picture ID to the deletion list if it exists
        if (destination.mainPicture) {
            imageIdsToDelete.push(destination.mainPicture);
        }

        // Add all image IDs from the images array to the deletion list if it exists and has elements
        if (destination.images && destination.images.length > 0) {
            imageIdsToDelete.push(...destination.images);
        }

        // Delete the associated images from the Images collection
        if (imageIdsToDelete.length > 0) {
            await Images.deleteMany({ _id: { $in: imageIdsToDelete } });
            console.log(`Deleted ${imageIdsToDelete.length} associated images.`);
        }

        // Finally, delete the destination document from the database
        const result = await Destination.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "Destination and associated images were deleted successfully" })
            : res.status(404).send({ message: "There is no destination with this ID" });

    } catch (error) {
        console.error("Error deleting destination:", error);
        res.status(500).send({ message: "Destination wasn't deleted due to an error" });
    }
};

module.exports = {
    createDestination,
    getAllDestinations,
    getFeaturedDestinations,
    getOneDestination,
    updateDestination,
    deleteDestination
}