const ObtainManagementToken = require("../utils/ObtainManagementToken");
const request = require("request");
const Joi = require("joi");
const log = require("../utils/logger");
const s3 = require("../utils/s3");
const Client = require("../models/ProjectMgmt/Client");
const Project = require("../models/ProjectMgmt/Project");

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = function createUser(req, res) {
    const { id } = req.body;
    log("Received request: deleteUser");

    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "Invalid input" });
    }

    // Perform some cleanup before deleting the user
    
    // Delete any profile photos from S3

    s3.listObjects({
        Bucket: BUCKET_NAME + "/avatars",
        Prefix: id,
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data.Contents.length > 0) {
                data.Contents.forEach(obj => {
                    s3.deleteObject({
                        Bucket: BUCKET_NAME + "/avatars",
                        Key: obj.Key,
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });
                });
            }
        }
    });

    // Delete any projects / clients from the database
    Client.find({ userId: id }).then(clients => {
        clients.forEach(client => {
            Project.find({ belongsTo: id }).then(projects => {
                projects.forEach(project => {
                    project.remove();
                });
            });
        });
    });

    // Delete the user from auth0
    ObtainManagementToken().then((token) => {
        request({
            method: 'DELETE',
            url: `https://${process.env.AUTH0_MANAGEMENT_API_DOMAIN}/api/v2/users/${id}`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }, function (error, response, body) {
            if (error) {
                res.status(500).json({
                    message: "Error deleting user",
                });
            } else {
                res.status(200).json({
                    message: "Success",
                });
            }
        });
    });
}