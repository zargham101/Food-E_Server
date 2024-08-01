const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretToken = "IamZarghamPracticingMywebdevelop";

const User = require('../models/User');

router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 7 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/loginuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {

        let useremail = await User.findOne({ email });
        if (!useremail) {
            return res.status(500).json({ error: "Invalid email. Try with the correct email" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, useremail.password)
        if (!pwdCompare) {
            return res.status(500).json({ error: "Invalid password. Try with the correct password" });
        }

        const data = {
            user: {
                id: useremail.id
            }
        }
        const authToken = jwt.sign(data, secretToken)
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
