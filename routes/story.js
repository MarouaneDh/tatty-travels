/**
 * @swagger
 * components:
 *   schemas:
 *     Story:
 *       type: object
 *       required:
 *         - title
 *         - country
 *         - city
 *         - content
 *         - mainPicture
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the story
 *         title:
 *           type: string
 *           description: Title of the story
 *         country:
 *           type: string
 *           description: The story country
 *         city:
 *           type: string
 *           description: The story city
 *         content:
 *           type: string
 *           description: content of the story
 *         mainPicture:
 *           type: string
 *           description: The main picture of the story 
 *       example:
 *         title: A Solo Adventure in Italy
 *         country: Italy
 *         city: Rome
 *         content: My journey to Italy began with a spontaneous decision. I had always dreamed of exploring the historic cities and picturesque countryside, but never found the right time or company. So, I decided to go solo. I started in Rome, where I spent days wandering through ancient ruins, marveling at the Colosseum, and tossing a coin into the Trevi Fountain. The city was a whirlwind of history and culture, and I was completely captivated. From Rome, I took a train to Florence, the birthplace of the Renaissance. I explored the Uffizi Gallery, climbed to the top of the Duomo, and crossed the Ponte Vecchio. The city was a feast for the eyes, with its stunning architecture and art. Next, I ventured into the Tuscan countryside, where I rented a car and drove through rolling hills and vineyards. I visited charming medieval towns, sampled local wines, and indulged in delicious Italian cuisine. The entire experience was transformative. I learned to rely on myself, to navigate unfamiliar places, and to embrace the unexpected. I discovered a newfound sense of independence and confidence. Italy taught me that solo travel is not just about seeing new places, but also about discovering yourself. It was an adventure I will never forget.
 *         mainPicture: 67f62d706a4bb602926282e6
 *  
 */

/**
 * @swagger
 * tags:
 *   name: Stories
 *   description: The stories managing API
 * /api/story:
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Story'
 *     responses:
 *       200:
 *         description: The story was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: The list of stories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Story'
 *       500:
 *         description: Some server error
 * /api/story/{id}:
 *   get:
 *     summary: Get one story
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The story id
 *     responses:
 *       200:
 *         description: The list of stories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Story'
 *       404:
 *        description: The story was not found
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: edit one story
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The story id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Story'
 *     responses:
 *       200:
 *         description: The story was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Story'
 *       404:
 *        description: The story was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete the story by id
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The story id
 *
 *     responses:
 *       200:
 *         description: The story was deleted
 *       404:
 *         description: The story was not found
 *
 */

const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { createStory, getAllStorys, getOneStory, updateStory, deleteStory } = require("../controllers/story.controller");

// POST
// Story posting
// PATH: http://localhost:3000/api/story/
// Params Body
router.post("/", isAuth, createStory);

// GET
// Getting all storys
// PATH: http://localhost:3000/api/story/
router.get("/", isAuth, getAllStorys);

// POST
// Getting story by id
// PATH: http://localhost:3000/api/story/:id
// Params id
router.get("/:id", isAuth, getOneStory);

// PATCH
// Updating a story by id
// PATH: http://localhost:3000/api/story/:id
// Params id body
router.patch("/:id", isAuth, updateStory);

// DELETE
// Deleting a story by id
// PATH: http://localhost:3000/api/story/:id
// Params id
router.delete("/:id", isAuth, deleteStory);

module.exports = router;
