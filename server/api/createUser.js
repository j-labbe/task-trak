const ObtainManagementToken = require("../utils/ObtainManagementToken");
const request = require("request");
const Joi = require("joi");
const log = require("../utils/logger");

module.exports = function createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    log("Received request: createUser");

    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "Invalid input" });
    }

    ObtainManagementToken().then((token) => {
        request({
            method: 'POST',
            url: `https://${process.env.AUTH0_MANAGEMENT_API_DOMAIN}/api/v2/users`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                given_name: firstName,
                family_name: lastName,
                email,
                password,
                connection: "Username-Password-Authentication",
                verify_email: true
            })
        }, function (error, response, body) {
            if (error) {
                res.status(500).json({
                    message: "Error updating email",
                });
            } else {
                res.status(200).json({
                    message: "Success",
                });
            }
        });
    });
}