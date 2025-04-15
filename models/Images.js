const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    type: { type: String, enum: ['hero', 'story', 'destination'], default: 'destination' },
    assiciatedTo: { type: String, default: 'destination' },
    isMain: { type: String, default: 'false' },
    created_at: { type: Date },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Image', ImageSchema);