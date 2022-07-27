const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

const Project = require('../models/ProjectMgmt/Project');
const Client = require('../models/ProjectMgmt/Client');
const Reminder = require('../models/Reminders/Reminder');

const ProjectType = require("./ProjectMgmt/types/ProjectType");
const ClientType = require("./ProjectMgmt/types/ClientType");
const ReminderType = require("./Reminders/types/ReminderType");

const MUTATIONS = require("./mutations");

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
        },
        reminders: {
            type: new GraphQLList(ReminderType),
            args: { userId: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Reminder.find().where('belongsTo', args.userId);
            }
        },
        reminder: {
            type: ReminderType,
            args: { id: { type: GraphQLID }, userId: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return Reminder.findById(args.id).where('belongsTo', args.userId);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: MUTATIONS.ProjectManagement.addProject,
        deleteProject: MUTATIONS.ProjectManagement.deleteProject,
        addClient: MUTATIONS.ProjectManagement.addClient,
        deleteClient: MUTATIONS.ProjectManagement.deleteClient,
        updateProject: MUTATIONS.ProjectManagement.updateProject,
        addReminder: MUTATIONS.Reminders.addReminder,
        deleteReminder: MUTATIONS.Reminders.deleteReminder,
        updateReminder: MUTATIONS.Reminders.updateReminder
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});