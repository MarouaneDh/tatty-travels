const mongoose = require("mongoose");

const schema = mongoose.Schema;

const storySchema = new schema({
    title: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    mainPicture: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { timestamps: true });
module.exports = Story = mongoose.model("Story", storySchema);