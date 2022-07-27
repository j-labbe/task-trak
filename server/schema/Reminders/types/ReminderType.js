const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require("graphql");

const ReminderType = new GraphQLObjectType({
    name: "Reminder",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        reminderDateTime: { type: GraphQLString },
        status: { type: GraphQLBoolean },
        belongsTo: { type: GraphQLString }
    })
});

module.exports = ReminderType;