// Validation
const Joi = require('@hapi/joi');

// Register Validation
const registerValidayion = data => {

    const schema = Joi.object({ // samarbetar med User model
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

// Login Validation
const loginValidation = data => {
    
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

module.exports = {
    registerValidayion,
    loginValidation
};