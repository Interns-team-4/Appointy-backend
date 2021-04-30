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
const { AuthMiddleware } = require("../utils/auth");
const EmailService = require("../service/EmailService/emailService");
const ErrorCodes = require("../service/ErrorCodes/errorcodes");

const mongoose = require("mongoose");
const User = require("../models/User");


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

// account_verification

// http://localhost:8080/account_verification/bd157f60ced130d20753970cf971f663e87c4e57

router.get('/account_verification/:id',
    (req, ...args) => reqHandler(EmailService.accountVerification, req.params)(req, ...args),
    resHandler
)


router.post('/generate_otp',
    (req, res, next) => reqHandler(EmailService.generateOtp, req.body)(req, res, next),
    resHandler
)


router.post("/forgot_password",
    (req, ...args) => reqHandler(UserService.forgotPassword, req.body)(req, ...args),
    resHandler
)

//FetchID


router.get("/fetch_user_id/:id", async (req, res, next) => {
    const id = req.params.id;
    try{

    const response = await User.findOne({ _id: mongoose.Types.ObjectId(id) })
    res.send(response)
    }
    catch{
        res.status(400).send(ErrorCodes["USER_DOES_NOT_EXIST"])
    }

})




module.exports = router;
