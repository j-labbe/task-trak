// TODO: create a file upload endpoint that accepts a file and saves it to S3
const AWS = require("aws-sdk");
const ObtainManagementToken = require("../utils/ObtainManagementToken");
const request = require("request");
const Joi = require("joi");

const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

async function upload(imageName, base64Image, type) {
    const params = {
        Bucket: `${BUCKET_NAME}/avatars`,
        Key: `${imageName}`,
        Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), "base64"),
        ContentType: type,
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (err) {
        console.log(err);
        return "";
    }
}

async function uploadAvatar(req, res) {
    const { imageName, base64Image, type, id } = req.body;

    const schema = Joi.object({
        id: Joi.string().required(),
        imageName: Joi.string().required(),
        base64Image: Joi.string().required(),
        type: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.error(error);
        return res.status(400).json({ error: "Invalid input" });
    }

    const loc = await upload(imageName, base64Image, type);

    // update user's avatar in auth0
    try {
        const token = await ObtainManagementToken();
        request({
            method: 'PATCH',
            url: `https://${process.env.AUTH0_MANAGEMENT_API_DOMAIN}/api/v2/users/${id}`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                picture: loc
            })
        }, function (error, response, body) {
            if (error) {
                res.status(500).json({
                    message: "Error updating avatar",
                });
            } else {
                res.status(200).json({
                    message: "Success",
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error updating avatar",
        });
    }
}

module.exports = uploadAvatar;