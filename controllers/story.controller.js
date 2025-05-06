const Story = require('../models/Story')
const Images = require('../models/Images');

const createStory = async (req, res) => {
    try {
        const story = new Story(req.body);
        await story.save();
        res.status(201).send({ msg: "Story added with success", story });
    } catch (error) {
        res.status(400).send({ message: "Not able to add story" });
    }
};

const getAllStorys = async (req, res) => {

    try {
        if (req.body.token) {
            const result = await Story.find()
                .select("-__v")
                .sort({ createdAt: -1 });

            res.send({
                response: result,
                message: "Got all story with success",
            });
        } else {
            const result = await Story.find({ isLive: true })
                .select("-__v")
                .sort({ createdAt: -1 });

            res.send({
                response: result,
                message: "Got all story with success",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Can't get story" });
    }
};

const getOneStory = async (req, res) => {
    const _id = req.params.id;

    try {
        const result = await Story.findOne({ _id }).select("-__v");

        res.send({ response: result, message: `Got story with success` });
    } catch (error) {
        res.status(400).send({ message: "There is no story with this id" });
    }
};

const updateStory = async (req, res) => {
    const _id = req.params.id;

    try {
        const story = await Story.findById(_id);

        if (!story) {
            return res.status(404).send({ message: "story not found" });
        }

        Object.assign(story, req.body);

        await story.save();

        res.status(200).send({ message: `Story was updated successfully`, story });
    } catch (error) {
        res.status(400).send({ message: "Unable to update story" });
    }
};

const deleteStory = async (req, res) => {
    const _id = req.params.id;

    try {
        const story = await Story.findById(_id);

        if (!story) {
            return res.status(404).send({ message: "There is no story with this ID" });
        }

        const imageIdsToDelete = [];

        // Add main picture ID to the deletion list if it exists
        if (story.mainPicture) {
            imageIdsToDelete.push(story.mainPicture);
        }

        // Add all image IDs from the images array to the deletion list if it exists and has elements
        if (story.images && story.images.length > 0) {
            imageIdsToDelete.push(...story.images);
        }

        // Delete the associated images from the Images collection
        if (imageIdsToDelete.length > 0) {
            await Images.deleteMany({ _id: { $in: imageIdsToDelete } });
            console.log(`Deleted ${imageIdsToDelete.length} associated images for story.`);
        }

        // Finally, delete the story document from the database
        const result = await Story.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "Story and associated images were deleted successfully" })
            : res.status(404).send({ message: "There is no story with this ID" });

    } catch (error) {
        console.error("Error deleting story:", error);
        res.status(500).send({ message: "Story wasn't deleted due to an error" });
    }
};

module.exports = {
    createStory,
    getAllStorys,
    getOneStory,
    updateStory,
    deleteStory
}