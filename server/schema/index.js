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
            args: { userId: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Project.find().where('belongsTo', args.userId);
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }, userId: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return Project.findById(args.id).where('belongsTo', args.userId);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            args: { userId: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Client.find().where('belongsTo', args.userId);
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }, userId: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return Client.findById(args.id).where('belongsTo', args.userId);
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