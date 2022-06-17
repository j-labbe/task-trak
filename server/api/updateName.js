const ObtainManagementToken = require("../utils/ObtainManagementToken");
const request = require("request");
const Joi = require("joi");
const log = require("../utils/logger");

module.exports = function updateName(req, res) {
    const { given_name, family_name, id } = req.body;
    
    log("Received request: updateEmail");

    console.log(req.body);

    const schema = Joi.object({
        id: Joi.string().required(),
        given_name: Joi.string().required(),
        family_name: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "Invalid input" });
    }

    ObtainManagementToken().then((token) => {
        request({
            method: 'PATCH',
            url: `https://${process.env.AUTH0_MANAGEMENT_API_DOMAIN}/api/v2/users/${id}`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                given_name,
                family_name
            })
        }, function (error, response, body) {
            if (error) {
                res.status(500).json({
                    message: "Error updating name",
                });
            } else {
                res.status(200).json({
                    message: "Success",
                });
            }
        });
    });

}