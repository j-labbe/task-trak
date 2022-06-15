const { GraphQLID, GraphQLNonNull } = require('graphql');
const ClientType = require('../types/ClientType');
const Client = require('../../../models/ProjectMgmt/Client');
const Project = require('../../../models/ProjectMgmt/Project');

const deleteClient = {
    type: ClientType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
        Project.find({ clientId: args.id}).then(projects => {
            projects.forEach(project => {
                project.remove();
            });
        });
        return Client.findByIdAndRemove(args.id);
    }
};

module.exports = deleteClient;