const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const Reminder = require('../../../models/Reminders/Reminder');
const ReminderType = require('../types/ReminderType');
const ServiceManager = require('../../../.');
const ReminderService = require('../../../services/ReminderService');

const addReminder = {
    type: ReminderType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        reminderDateTime: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLBoolean) },
        belongsTo: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        const reminder = new Reminder({
            name: args.name,
            description: args.description,
            reminderDateTime: args.reminderDateTime,
            status: args.status,
            belongsTo: args.belongsTo
        });

        reminder.save();

        ServiceManager.register(reminder.id, new ReminderService({
            id: reminder.id,
            name: reminder.name,
            description: reminder.description,
            reminderDateTime: reminder.reminderDateTime, // TODO: convert to date (being mindful of timezones - always use UTC)
            status: reminder.status,
            link: "",
            shouldSendEmail: true // TODO: get this from the user
        }));

    }
}

module.exports = addReminder;