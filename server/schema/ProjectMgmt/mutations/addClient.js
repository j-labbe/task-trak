const { GraphQLNonNull, GraphQLString } = require('graphql');
const Client = require('../../../models/ProjectMgmt/Client');
const ClientType = require('../types/ClientType');

const addClient = {
    type: ClientType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
        const client = new Client({
            name: args.name,
            phone: args.phone,
            email: args.email
        });

        return client.save();
    }
};

module.exports = addClient;