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
        required: false,
    },
    bestTime: {
        type: String,
        required: false,
    },
    featured: {
        type: Boolean,
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
module.exports = Destination = mongoose.model("Destination", destinationSchema);