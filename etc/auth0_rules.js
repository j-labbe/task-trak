/**
 * This file contains rules that are used in the Auth0 authentication pipeline.
 * 
 * If you would like to run them on your own instance, copy and pase this into
 * the "rules" section of your dashboard.
 */

function addPersistenceAttribute(user, context, callback) {
    // create unique id < 40
    function m() { let t = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; for (let n = 0; n < 45; n++)t += r.charAt(Math.floor(Math.random() * r.length)); return t; }

    user.user_metadata = user.user_metadata || {};
    user.user_metadata.userId = user.user_metadata.userId || m();
    context.idToken['https://example.com/yournamespace'] =
        user.user_metadata.userId;

    auth0.users
        .updateUserMetadata(user.user_id, user.user_metadata)
        .then(function () {
            callback(null, user, context);
        })
        .catch(function (err) {
            callback(err);
        });
}