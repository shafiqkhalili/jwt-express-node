require('dotenv').config();
const express = require("express");
let mongoose = require('mongoose');
const { Router } = require('express');
const { withJWTAuthMiddleware } = require("express-kun");
const bodyParser = require("body-parser");
const { createRate, getRate, getRates, updateRate, deleteRate } = require('./controllers/currencyRate');
const { login, createUser } = require("./controllers/user");
const cors = require("cors");

const router = Router();
const app = express();

var corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
};
app.set('view engine', 'ejs');


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

mongoose.set('useFindAndModify', false);

const protectedRouter = withJWTAuthMiddleware(router, "yourSecretKey");


router.post("/users", createUser);
router.post("/users/login", login);

protectedRouter.get('/currencyRates', getRates);
protectedRouter.get('/currencyRates/:id', getRate);
protectedRouter.put('/currencyRates/:id', updateRate);
protectedRouter.post('/currencyRates', createRate);
protectedRouter.delete('/currencyRates/:id', deleteRate);

const PORT = process.env.PORT || 8080;

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
