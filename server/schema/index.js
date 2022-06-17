const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

const Project = require('../models/ProjectMgmt/Project');
const Client = require('../models/ProjectMgmt/Client');

const ProjectType = require("./ProjectMgmt/types/ProjectType");
const ClientType = require("./ProjectMgmt/types/ClientType");

const MUTATIONS = require("./ProjectMgmt/mutations");

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return Project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return Client.findById(args.id);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: MUTATIONS.addProject,
        deleteProject: MUTATIONS.deleteProject,
        addClient: MUTATIONS.addClient,
        deleteClient: MUTATIONS.deleteClient,
        updateProject: MUTATIONS.updateProject
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});