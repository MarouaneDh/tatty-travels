/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       required:
 *         - title
 *         - country
 *         - city
 *         - description
 *         - toDo
 *         - featured
 *         - mainPicture
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the destination
 *         title:
 *           type: string
 *           description: Title of the destination
 *         country:
 *           type: string
 *           description: The destination country
 *         city:
 *           type: string
 *           description: The destination city
 *         description:
 *           type: string
 *           description: description of the destination
 *         toDo:
 *           type: array
 *           description: list of things to do at the destination
 *         featured:
 *           type: boolean
 *           description: is the destination featured or not
 *         mainPicture:
 *           type: string
 *           description: The main picture of the destination 
 *       example:
 *         title: Santorini Sunsets
 *         country: Greece
 *         city: Santorini
 *         description: A beautiful island in the Aegean Sea known for its stunning sunsets.
 *         toDo:
 *          - Visit the caldera
 *          - Explore Oia
 *          - Enjoy local cuisine
 *         bestTime: Summer
 *         featured: true
 *         mainPicture: 67f62d706a4bb602926282e6
 *         images:
 *          - 67f62d706a4bb602926282e6
 *          - 67f62d706a4bb602926282e6
 *          - 67f62d706a4bb602926282e6
 *  
 */

/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: The destinations managing API
 * /api/destination:
 *   post:
 *     summary: Create a new destination
 *     tags: [Destinations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destination'
 *     responses:
 *       200:
 *         description: The destination was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destination'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: The destination of destinations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Destination'
 *       500:
 *         description: Some server error
 * /api/destination/{id}:
 *   get:
 *     summary: Get one destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination id
 *     responses:
 *       200:
 *         description: One destination.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Destination'
 *       404:
 *        description: The destination was not found
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: edit one destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destination'
 *     responses:
 *       200:
 *         description: The destination was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Destination'
 *       404:
 *        description: The destination was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete the destination by id
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination id
 *
 *     responses:
 *       200:
 *         description: The destination was deleted
 *       404:
 *         description: The destination was not found
 * /api/destination/featured:
 *   get:
 *     summary: Get featured destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: The list of featured destinations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Destination'
 *       404:
 *        description: The featured destinations were not found
 *       500:
 *         description: Some server error
 */

const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { createDestination, getAllDestinations, getOneDestination, updateDestination, deleteDestination, getFeaturedDestinations } = require("../controllers/destination.controller");

// POST
// Destination posting
// PATH: http://localhost:3000/api/destination/
// Params Body
router.post("/", isAuth, createDestination);

// GET
// Getting all destinations
// PATH: http://localhost:3000/api/destination/
router.get("/", getAllDestinations);

// GET
// Getting all destinations
// PATH: http://localhost:3000/api/destination/
router.get("/featured", getFeaturedDestinations);

// POST
// Getting destination by id
// PATH: http://localhost:3000/api/destination/:id
// Params id
router.get("/:id", getOneDestination);

// PATCH
// Updating a destination by id
// PATH: http://localhost:3000/api/destination/:id
// Params id body
router.patch("/:id", isAuth, updateDestination);

// DELETE
// Deleting a destination by id
// PATH: http://localhost:3000/api/destination/:id
// Params id
router.delete("/:id", isAuth, deleteDestination);

module.exports = router;
