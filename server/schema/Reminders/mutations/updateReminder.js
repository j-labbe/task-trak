const { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');
const Reminder = require('../../../models/Reminders/Reminder');
const ReminderType = require('../types/ReminderType');

const updateReminder = {
    type: ReminderType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        reminderDateTime: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLBoolean) }
    },
    resolve(parent, args) {
        return Reminder.findByIdAndUpdate(args.id, {
            $set: {
                name: args.name,
                description: args.description,
                reminderDateTime: args.reminderDateTime,
                status: args.status,
            }
        }, { new: true });
    }
}

module.exports = updateReminder;