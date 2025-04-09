const Story = require('../models/Story')

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
    const token = req.headers.authorization.split(' ')[1];

    try {

        const result = await Story.find()
            .select("-__v")
            .sort({ createdAt: -1 });

        res.send({
            response: result,
            message: "Got all story with success",
        });
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
    const _id = req.params.id

    try {
        const result = await Story.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "Story was deleted successfully" })
            : res.status(404).send({ message: "There is no story with this ID" })

    } catch (error) {
        res.send("Story wasn't deleted");
    }
};

module.exports = {
    createStory,
    getAllStorys,
    getOneStory,
    updateStory,
    deleteStory
}