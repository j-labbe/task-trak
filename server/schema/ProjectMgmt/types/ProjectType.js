const { GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql");
const Client = require("../../../models/ProjectMgmt/Client");
const ClientType = require("./ClientType");

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        belongsTo: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            }
        }
    })
});

module.exports = ProjectType;