const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const escape = require("escape-html");

const alphaCharacterValidation = /[a-zA-Z -]/;
const alphaNumericCharacterValidation = /[a-zA-Z0-9]/;
const emailValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

let saltRounds = 10;

// ###################################### AUTHORIZE

router.get("/user/authorize", async (req, res) => {
  if (!req.session.user) {
    return res.send(false);
  }

  res.status(200).send(true);
});

// ###################################### SIGNUP

router.post("/user/signup", async (req, res) => {
  if (req.session.user) {
    return res.status(401).send({
      response: "User already has a session",
    });
  }

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
      response: "Please fill out all the required fields",
    });
  }
  if (!password.length >= 8) {
    return res.status(400).send({
      response: "Your password must be at least 8 characters",
    });
  }
  if (password !== repeatPassword) {
    return res.status(400).send({
      response: "The passwords doesn't match",
    });
  }
  if (
    alphaCharacterValidation.test(firstName) === false &&
    alphaCharacterValidation.test(lastName) === false
  ) {
    return res.status(400).send({
      response: "Your name must not contain special characters",
    });
  }
  if (
    alphaNumericCharacterValidation.test(password) === false &&
    alphaNumericCharacterValidation.test(repeatPassword) === false
  ) {
    return res.status(400).send({
      response: "Your password must not contain special characters",
    });
  }
  if (emailValidation.test(email) === false) {
    return res.status(400).send({
      response: "Please enter a valid e-mail",
    });
  }

  try {
    let user = await User.query()
      .select()
      .where({
        email: email,
      })
      .limit(1);

    if (user[0]) {
      return res.status(400).send({
        response: "The given email is already registered. Please log in",
      });
    }

    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
      if (error) {
        console.log("Error hashing password");
        return res.status(404).send({
          response: "Something went wrong, please try again",
        });
      }

      console.log("Hashed password succesfully", hashedPassword);

      user = await User.query().insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });

      delete user.password;

      req.session.user = user;

      return res.status(200).send({
        response: user,
        message: "Signup successful! Let's go to your profile",
      });
    });
  } catch (error) {
    return res.status(500).send({
      response: "Something went wrong, please try again",
    });
  }
});

// ###################################### LOGIN

router.post("/user/login", async (req, res) => {
  if (req.session.user) {
    return res.status(401).send({
      response: "User already has a session",
    });
  }

  let {
    email,
    password
  } = req.body;

  email = escape(email);
  password = escape(password);

  if (!email || !password) {
    return res.status(400).send({
      response: "Please fill out all the required fields",
    });
  }
  if (!password.length === 8) {
    return res.status(400).send({
      response: "Your password must be at least 8 characters",
    });
  }
  if (alphaNumericCharacterValidation.test(password) === false) {
    return res.status(400).send({
      response: "Your password must not contain special characters",
    });
  }
  if (emailValidation.test(email) === false) {
    return res.status(400).send({
      response: "Please provide a valid e-mail",
    });
  }

  try {
    const userReq = await User.query()
      .select()
      .where({
        email: email,
      })
      .limit(1);

    let user = userReq[0];

    if (!user) {
      return res.status(404).send({
        response: "The given email is not registered. Please sign up to proceed",
      });
    }

    if (user.isActive === 0) {
      return res.status(401).send({
        response: "The given email is not registered. Please sign up to proceed",
      });
    }

    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        // error in bcrypt
        return res.status(500).send({
          response: "Something went wrong hashing password, please try again",
        });
      }
      if (!isSame) {
        return res.status(404).send({
          response: "Your password is incorrect, please try again",
        });
      }

      delete user.password;

      req.session.user = user;

      return res.status(200).send({
        response: req.session.user,
      });
    });
  } catch (error) {
    return res.status(500).send({
      response: "Something went wrong, please try again",
    });
  }
});

// ###################################### LOGOUT

router.get("/user/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({
      response: "User is logget out",
    });
  }

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({
        response: "Error logging out. Please try again.",
      });
    }
    res.status(200).send({
      response: "Log out succesful",
    });
  });
});

// ###################################### PROFILE

router.get("/user/profile", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({
      response: "User not authorized",
    });
  }

  if (req.session.user.isActive === 0) {
    return res.status(401).send({
      response: "User not authorized",
    });
  }

  res.status(200).send({
    response: req.session.user,
  });
});

module.exports = router;