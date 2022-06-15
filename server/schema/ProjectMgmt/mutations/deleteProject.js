const { GraphQLID, GraphQLNonNull } = require('graphql');
const ProjectType = require('../types/ProjectType');
const Project = require('../../../models/ProjectMgmt/Project');

const deleteProject = {
    type: ProjectType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
    }
};

module.exports = deleteProject;