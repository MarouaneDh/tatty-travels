/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - role
 *         - firstName
 *         - lastName
 *         - password
 *         - email
 *       properties:
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
 *         role: admin
 *         firstName: John
 *         lastName: Doe
 *         password: 12345678Aa*
 *         email: johndoe@gmail.com
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: the user's email
 *         password:
 *           type: string
 *           description: the user's password
 *       example:
 *         email: johndoe@gmail.com
 *         password: 12345678Aa*
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: The user was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The user was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 *
 */


const router = require("express").Router();

const {
    validator,
    loginRules,
    registerRules,
} = require("../middlewares/authBodyValidator.js");

const { register, login } = require("../controllers/auth.controller");

//User registration
router.post("/register", registerRules(), validator, register)

//User login
router.post("/login", loginRules(), validator, login)

module.exports = router;