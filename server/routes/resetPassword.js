const router = require("express").Router();
const User = require("./../models/User");
const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
const smtp = require("./../config/smtpCredentials");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

router.post("/requestReset", async (req, res) => {
    let {
        email
    } = req.body;

    console.log(req.body);

    if (!email) {
        return res.status(401).send({
            response: "Missing fields.",
        });
    }
    if (emailValidation.test(email) === false) {
        return res.status(401).send({
            response: "Not a valid e-mail.",
        });
    }

    try {
        let user = await User.query()
            .select()
            .where({
                email: email,
            })
            .limit(1);

        if (!user[0]) {
            return res.status(404).send({
                response: "User not found."
            })
        }

        const transporter = nodemailer.createTransport(smtp);

        transporter.verify((error) => {
            if (error) {
                console.log(error)
                return res.status(502).send({
                    response: "Sorry, something went wrong. Please try again"
                })
            }
        })

        const emailOutput = `<h1>Reset password</h1> <p>Please follow the <a href="http://localhost:3000/confirmReset/${user[0].ID}">link</a> to reset your password</p>`;

        const mailOptions = {
            from: "mathildeatkea@gmail.com",
            to: "mathildeatkea@gmail.com",
            subject: "Reset password",
            text: "Follow the link to reset your password.",
            html: emailOutput
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(502).send({
                    response: "Sorry, something went wrong. Please try again"
                });
            }
            console.log(info);
            return res.status(200).send({
                response: "Email sent succesfully"
            })
        })

    } catch (error) {
        return res.status(404).send({
            response: "Error connecting to the database.",
        });
    }
});

router.post("/confirmReset", async (req, res) => {
    const {
        password,
        repeatPassword,
        ID
    } = req.body;

    if (!password && !repeatPassword && !ID) {
        return res.status(400).send({
            response: "Missing fields."
        });
    }
    if (password !== repeatPassword) {
        return res.status(400).send({
            response: "Passwords don't match."
        });
    }

    try {
        const response = await User.query().select("password").where({
            ID: ID
        });

        const userPassword = response[0].password;

        if (!userPassword) {
            return res.status(404).send({
                response: "User not authorized."
            });
        }

        console.log(userPassword);

        bcrypt.compare(password, userPassword, (error, isSame) => {
            if (error) {
                console.log(error);
                return res.status(500).send({
                    response: "Something went wrong. Please try again"
                });
            }

            if (isSame) {
                return res.status(400).send({
                    response: "Sorry, you can't use a previously used password. Please try again"
                });
            }

            bcrypt.hash(password, 10, async (error, hashedPassword) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                        response: "Something went wrong. Please try again"
                    });
                }

                await User.query().update({
                    password: hashedPassword
                }).where({
                    ID: ID
                });

                return res.status(200).send({
                    response: "Password updated succesfully. Redirecting to login..."
                });
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(404).send({
            response: "Error connecting to the database.",
        });
    }

});

module.exports = router;