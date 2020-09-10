const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        res.json('Email / password required');
    }
    console.log(req.body);
    const user = await userModel.create({
        email,
        password
    }).catch(err => {
        res.json(`userModel.create error: ${err}`);
    });
    if (user) {
        res.json({
            user,
            message: "User created successfully"
        });
    }


}

async function login(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    }).catch(err => {
        res.json(`userModel.findo error: ${err}`);
    });
    console.log(password, user.password);
    if (!user) {
        res.json("Email not found or password is wrong");
    } else {
        if (bcrypt.compareSync(password, user.password)) {
            try {
                const token = jwt.sign({ user }, "yourSecretKey", {
                    expiresIn: "24h"
                });
                if (token) {
                    res.json({
                        user,
                        token,
                        message: "Successfully logged in."
                    });
                }
            } catch (error) {
                res.json("error: ", error);
            }


        } else {
            res.status(401).json({
                message: "Unauthenticated"
            });
        }
    }
}

module.exports = {
    createUser, login
};