"use Strict";

const express = require("express");
const router = express.Router();

const { userSignupSchema, loginSchema } = require("./validation/userValidation");
const Validator = require("express-json-validator-middleware").Validator;
const validator = new Validator({ allErrors: true });
const validate = validator.validate;
const UserService = require("../service/User/UserService");
const reqHandler = require("../utils/requestRoutes");
const resHandler = require("../utils/responseRoutes");
const { AuthMiddleware, UserMiddleware } = require("../utils/auth");



router.get("/fetchUsers",
    AuthMiddleware,
    (req, res, next) => reqHandler(UserService.fetchAllUser)(req, res, next),
    resHandler
);

router.post("/signup", validate({ body: userSignupSchema }),
    (req, res, next) => reqHandler(UserService.addUser, req.body)(req, res, next),
    resHandler
)

router.post("/login", validate({ body: loginSchema }),
    (req, ...args) => reqHandler(UserService.login, req.body)(req, ...args),
    (req, res, next) => {
        next();
    },
    resHandler
)



module.exports = router;
