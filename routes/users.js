/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - role
 *         - firstName
 *         - lastName
 *         - password
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the list
 *         role:
 *           type: string
 *           description: The role of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         _id: 65bd075c828f42b463067bbc
 *         role: husband
 *         firstName: John
 *         lastName: Doe
 *         password: $2b$10$4Is68W3THLOq3/AavuO7TO/CyjCUh/i1dMfxg2ejxK.cNMzap36we
 *         email: johndoe@gmail.com
 *         
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Users managing API
 * /api/user/{id}:
 *   get:
 *     summary: get a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: edit a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/User'
 *       404:
 *        description: The user was not found
 *       500:
 *         description: Some server error
 *
 */

const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth')
const { getUser, editUser } = require('../controllers/user.controller')

//GET
//getting user by id
//PATH:http://localhost:3000/api/user/:id
//params id
router.get("/:id", isAuth, getUser);

//PATCH
//updating a user by id
//PATH:http://localhost:3000/api/user/:id
//params id body
router.patch("/:id", isAuth, editUser);

module.exports = router;
