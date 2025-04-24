/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       required:
 *         - filename
 *         - data
 *         - contentType
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the image
 *         filename:
 *           type: string
 *           description: The name of the file
 *         data:
 *           type: string
 *           format: binary
 *           description: The binary data of the file
 *         contentType:
 *           type: string
 *           description: The MIME type of the file
 *       example:
 *         _id: 60bd075c828f42b463067bbc
 *         filename: image.png
 *         data: (binary data)
 *         contentType: image/png
 *
 * tags:
 *   name: Image
 *   description: The Image managing API
 * /api/image/{id}:
 *   get:
 *     summary: Get an image
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image id
 *     responses:
 *       200:
 *         description: The image was found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: Update an image
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Image'
 *     responses:
 *       200:
 *         description: The image was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Image'
 *       404:
 *         description: The image was not found
 *       500:
 *         description: Some server error
 * /api/image:
 *   post:
 *     summary: Upload an image
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       201:
 *         description: The image was uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       500:
 *         description: Some server error
 */

const express = require("express");
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadImage, getImage, getAllImages, getHeroImage, deleteImage } = require("../controllers/image.controller");

//POST
//uploading image
//PATH:http://localhost:3000/api/upload
router.post("/", upload.single('file'), uploadImage);

//GET
//getting hero image
//PATH:http://localhost:3000/api/upload/hero
router.get('/get/hero', getHeroImage)

//GET
//getting one image
//PATH:http://localhost:3000/api/upload/:id
router.get('/:id', getImage)

//DELETE
//delete one image
//PATH:http://localhost:3000/api/upload
router.delete('/:id', deleteImage)

//GET
//getting all images
//PATH:http://localhost:3000/api/upload
router.get('/', getAllImages)

module.exports = router;
