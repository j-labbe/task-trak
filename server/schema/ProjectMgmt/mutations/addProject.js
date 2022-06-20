const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLEnumType } = require('graphql');
const Project = require('../../../models/ProjectMgmt/Project');
const ProjectType = require('../types/ProjectType');

const addProject = {
    type: ProjectType,
    args: {
        belongsTo: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
            type: new GraphQLEnumType({
                name: 'ProjectStatus',
                values: {
                    'new': { value: 'Not Started' },
                    'progress': { value: 'In Progress' },
                    'completed': { value: 'Completed' },
                }
            }),
            defaultValue: 'Not Started'
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        const project = new Project({
            name: args.name,
            description: args.description,
            status: args.status,
            clientId: args.clientId,
            belongsTo: args.belongsTo
        });

        return project.save();
    }
};

module.exports = addProject;