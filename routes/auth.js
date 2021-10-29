const router = require('express').Router();
const User = require('../model/User'); // User schema
const { registerValidayion, loginValidation } = require('../validation'); // Inport validation funktioner.
const bcrypt = require('bcryptjs'); // Hachar vårt lösenord / krypterar lösenordet.
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => { // /api/user/register

    // Validate user
    const { error } = registerValidayion(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // if existing user...
    const emailExists = await User.findOne({email: req.body.email});

    if(emailExists) {
        return res.status(400).json({error: 'Email already exists.'});
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10); // Här skapar vi en agoritm för att cryptera vårt lösenord. 
    const hashPassword = await bcrypt.hash(req.body.password, salt); // Krypterar password. 

    // Create user!
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const saveUser = await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.json({user: user._id, redirect: 'batcave', token});
    } catch (error) {
        res.status(400).json(error);
    }
});



router.post('/login', async (req, res) => { // /api/user/login
    
    // Validate user
    const { error } = loginValidation(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // if existing email 
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.status(400).json({error: 'Email not found.'});
    }

    // Password correct?
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        return res.status(400).json({error: 'Invalid password.'});
    }

    // create and assign token. 
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET); // Skapar en token för att skicka till frontend. 
    res.header('auth-token', token).json({token, redirect: 'batcave'});

});

module.exports = router;