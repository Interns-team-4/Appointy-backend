"use Strict";

const express = require("express");
const router = express.Router();

const { userSignupSchema } = require("./validation/userValidation");
const Validator = require("express-json-validator-middleware").Validator;
const validator = new Validator({ allErrors: true });
const validate = validator.validate;
const UserService = require("../service/User/UserService");
const reqHandler = require("../utils/requestRoutes");
const resHandler = require("../utils/responseRoutes");

router.post("/signup", validate({ body: userSignupSchema }),
    (req, res, next) => reqHandler(UserService.addUser, req.body)(req, res, next),
    resHandler
)


module.exports = router;
