const mongoose = require("mongoose");

const schema = mongoose.Schema;

const destinationSchema = new schema({
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
    description: {
        type: String,
        required: true,
    },
    toDo: {
        type: [String],
        required: true,
    },
    bestTime: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        required: true,
    },
    mainPicture: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { timestamps: true });
module.exports = Destination = mongoose.model("Destination", destinationSchema);