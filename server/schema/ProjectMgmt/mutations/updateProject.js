const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLEnumType } = require('graphql');
const ProjectType = require('../types/ProjectType');
const Project = require('../../../models/ProjectMgmt/Project');

const updateProject = {
    type: ProjectType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
            type: new GraphQLEnumType({
                name: 'ProjectStatusUpdate',
                values: {
                    'new': { value: 'Not Started' },
                    'progress': { value: 'In Progress' },
                    'completed': { value: 'Completed' },
                }
            }),
        },
        clientId: { type: GraphQLString }
    },
    resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, {
            $set: {
                name: args.name,
                description: args.description,
                status: args.status,
                clientId: args.clientId
            }
        }, { new: true });
    }
};

module.exports = updateProject;