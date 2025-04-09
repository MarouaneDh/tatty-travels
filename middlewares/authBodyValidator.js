const { body, validationResult } = require("express-validator");

const registerRules = () => [
    body("firstName", "First name is required").notEmpty(),
    body("lastName", "Last name is required").notEmpty(),
    body("email", "Email is invalid").isEmail(),
    body("password", "password should contain at least 8 characters").isLength({
        min: 8,
    }),
    body(
        "password",
        "The password should contain at least one lowercase"
    ).matches(/.*[a-z].*/),
    body(
        "password",
        "The password should contain at least one uppercase"
    ).matches(/.*[A-Z].*/),
    body(
        "password",
        "The password should contain at least one symbol"
    ).matches(/.*[\W_].*/),
];

const loginRules = () => [
    body("email", "Invalid email").isEmail(),
    body(
        "password",
        "password should contain at least 8 characters"
    ).isLength({
        min: 8,
    }),
];

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array().map((el) => ({
                msg: el.msg,
            })),
        });
    }
    next();
};

module.exports = {
    validator,
    loginRules,
    registerRules,
};