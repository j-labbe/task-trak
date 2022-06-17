const request = require('request');

module.exports = ObtainManagementToken = async () => {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            url: `https://${process.env.AUTH0_MANAGEMENT_API_DOMAIN}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            body: `{"client_id":"${process.env.AUTH0_MANAGEMENT_API_CLIENT_ID}","client_secret":"${process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET}","audience":"${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}","grant_type":"client_credentials"}`
        }, function (error, response, body) {
            if (error) reject(error);

            try {
                const token = JSON.parse(body).access_token;
                resolve(token);
            } catch (error) {
                reject(error);
            }

        });
    });
}