const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

const userRoute = require("./routes/user");
const indexRoute = require("./routes/index");
const quizRoute = require("./routes/quiz");
const resetPasswordRoute = require("./routes/resetPassword");

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000 * 60 * 60 * 24,
        secure: true,
        httpOnly: true,
        sameSite: true
    }
}));

// REQUIRING CORS (Cross-Origin Resource Sharing) TO GET ALLOW THE CLIENT TO ACCESS THE DATA FROM THE SERVER
// For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.
// TO ALLOW ALL ORGINS: Access-Control-Allow-Origin: *
app.use(cors());

// SETUP THE DATABASE
const {
    Model
} = require("objection")
const Knex = require("knex")
const KnexFile = require("./knexfile.js")

// SETUP REQUEST LIMIT ON AUTH ROUTES
const rateLimit = require('express-rate-limit')
const authlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // reset interval
    max: 100 // requests pr IP pr interval
})

// KNEX CONNECTION WITH CREDENTIALS FROM CONFIG
const knex = Knex(KnexFile.development)

// GIVE KNEX CONNECTION INSTANCE TO OBJECTION
Model.knex(knex)

// ROUTES 
app.use(quizRoute)
app.use(userRoute, authlimiter)
app.use(indexRoute)
app.use(resetPasswordRoute)

// START THE SERVER
const port = process.env.PORT || 9090
const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server")
    }
    console.log("Server running on port", server.address().port)
})

// PROTECT THE DATABASE FROM CRASH WHEN EXPERIENCING ERRORS
process.on("uncaughtException", (err, data) => {
    if (err) {
        console.log("critical error, yet system kept running");
        return
    }
})