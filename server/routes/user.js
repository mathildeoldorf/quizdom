const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const escape = require("escape-html");

const alphaCharacterValidation = /[a-zA-Z -]/;
const alphaNumericCharacterValidation = /[a-zA-Z0-9]/;
const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

let user;
let sess;

// ###################################### SIGNUP

router.post("/user/signup", async (req, res) => {
    let {
        firstName,
        lastName,
        email,
        password,
        repeatPassword
    } = req.body;

    firstName = escape(firstName);
    lastName = escape(lastName);
    email = escape(email);
    password = escape(password);
    repeatPassword = escape(repeatPassword);

    if (!firstName || !lastName || !email || !password || !repeatPassword) {
        return res.status(400).send({
            response: "Please fill out all the required fields"
        });
    }
    if (!password.length >= 8) {
        return res.status(400).send({
            response: "Your password must be at least 8 characters"
        });
    }
    if (password !== repeatPassword) {
        return res.status(400).send({
            response: "The passwords doesn't match"
        });
    }
    if (alphaCharacterValidation.test(firstName) === false && alphaCharacterValidation.test(lastName) === false) {
        return res.status(400).send({
            response: "Your name must not contain special characters"
        });
    }
    if (alphaNumericCharacterValidation.test(password) === false && alphaNumericCharacterValidation.test(repeatPassword) === false) {
        return res.status(400).send({
            response: "Your password must not contain special characters"
        });
    }
    if (emailValidation.test(email) === false) {
        return res.status(400).send({
            response: "Please enter a valid e-mail"
        });
    }

    try {
        user = await User.query().select().where({
            email: email
        }).limit(1);

        if (user[0]) {
            return res.status(400).send({
                response: "The given email is already registered. Please log in"
            });
        }

        bcrypt.hash(password, 10, async (error, hashedPassword) => {
            if (error) {
                console.log("Error hashing password");
                return res.status(404).send({
                    response: "Something went wrong, please try again"
                });
            }

            console.log("Hashed password succesfully", hashedPassword)

            user = await User.query().insert({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });

            sess = req.session;
            sess.user = user;

            console.log(sess.user);

            delete sess.user.password;

            return res.status(200).send({
                response: sess.user
            });

        });

    } catch (error) {
        return res.status(500).send({
            response: "Something went wrong, please try again"
        });
    }
});



// ###################################### LOGIN

router.post("/user/login", async (req, res) => {

    let {
        email,
        password
    } = req.body;

    email = escape(email);
    password = escape(password);

    if (!email || !password) {
        return res.status(400).send({
            response: "Please fill out all the required fields"
        });
    }
    if (!password.length === 8) {
        return res.status(400).send({
            response: "Your password must be at least 8 characters"
        });
    }
    if (alphaNumericCharacterValidation.test(password) === false) {
        return res.status(400).send({
            response: "Your password must not contain special characters"
        });
    }
    if (emailValidation.test(email) === false) {
        return res.status(400).send({
            response: "Please provide a valid e-mail"
        });
    }

    try {

        const userReq = await User.query().select().where({
            email: email
        }).limit(1);
        user = userReq[0];

        if (!user) {
            return res.status(404).send({
                response: "The given email is not registered. Please sign up to proceed"
            });
        }

        bcrypt.compare(password, user.password, (error, isSame) => {
            if (error) { // error in bcrypt
                return res.status(500).send({
                    response: "Something went wrong, please try again"
                });
            }
            if (!isSame) {
                return res.status(404).send({
                    response: "Your password is incorrect, please try again"
                });
            }
            console.log(req.session);
            sess = req.session;
            sess.user = user;
            delete sess.user.password;

            console.log(req.session);
            return res.status(200).send({
                response: sess.user
            });
        });

    } catch (error) {
        return res.status(500).send({
            response: "Something went wrong, please try again"
        });
    }
})

// ###################################### LOGOUT

router.get("/user/logout", (req, res) => {

    if (!sess) {
        return res.status(401).send({
            response: "User already logget out"
        });
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({
                response: "Error logging out. Please try again."
            });
        }
        res.status(200).send({
            message: "Logging out",
            response: sess.user
        });
    })
})

// ###################################### PROFILE

router.get("/user/profile", async (req, res) => {

    if (!sess) {
        return res.status(401).send({
            response: "User not authorized"
        });
    }

    const userID = sess.user.ID;
    console.log(sess.user);

    try {
        const userReq = await User.query().select().where({
            ID: userID
        }).limit(1);

        user = userReq[0];

        if (!user) {
            return res.status(401).send({
                response: "User not authorized"
            });
        }

        res.status(200).send({
            response: sess.user
        });
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;