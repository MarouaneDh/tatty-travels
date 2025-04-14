const Images = require('../models/Images');
// const Destination = require('../models/Destination');

const uploadImage = async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        // const { listId, itemId } = req.body;

        const image = new Images({
            filename: originalname,
            data: buffer,
            contentType: mimetype,
            type: 'other'
        });

        await image.save();

        // Construct the image URL
        // const imageUrl = `https://wedzing.adaptable.app/api/upload/${image._id}`;

        // // Update the specific list item with the image URL
        // if (listId && itemId) {
        //     const list = await Destination.findById(listId);
        //     if (list) {
        //         const item = list.list.id(itemId);
        //         if (item) {
        //             item.imageURLs.push(imageUrl);
        //             await list.save();
        //         }
        //     }
        // }

        res.json({ message: 'Image uploaded successfully', imageId: image._id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image', details: error.message });
    }
};

const uploadHeroImage = async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;

        const existingHeroImage = await Images.findOne({ type: 'hero' });

        if (existingHeroImage) {
            existingHeroImage.filename = originalname;
            existingHeroImage.data = buffer;
            existingHeroImage.contentType = mimetype;
            await existingHeroImage.save();
            res.json({ message: 'Hero image replaced successfully', imageId: existingHeroImage._id });
        } else {
            const image = new Images({
                filename: originalname,
                data: buffer,
                contentType: mimetype,
                type: 'hero'
            });
            await image.save();
            res.json({ message: 'Hero image uploaded successfully', imageId: image._id });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload/replace hero image', details: error.message });
    }
};

const getImage = async (req, res) => {
    try {
        const image = await Images.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image', details: error.message });
    }
}

const getHeroImage = async (req, res) => {
    try {
        const image = await Images.findOne({ type: 'hero' }).exec();

        if (!image) {
            return res.status(404).json({ error: 'Hero image not found' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hero image', details: error.message });
    }
}

const getAllImages = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const skip = (pageNumber - 1) * limitNumber;

        const images = await Images.find()
            .skip(skip)
            .limit(limitNumber);

        if (!images || images.length === 0) {
            return res.status(404).json({ error: 'Images not found' });
        }

        const modifiedImages = images.map(image => {
            const { _id, filename } = image;
            return {
                _id,
                filename,
                imageUrl: `http://localhost:3000/api/upload/${_id}`
            };
        });

        const totalImages = await Images.countDocuments();
        const totalPages = Math.ceil(totalImages / limitNumber);

        res.json({
            page: pageNumber,
            limit: limitNumber,
            totalImages,
            totalPages,
            images: modifiedImages
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image', details: error.message });
    }
}

module.exports = {
    uploadImage,
    uploadHeroImage,
    getImage,
    getHeroImage,
    getAllImages
}
