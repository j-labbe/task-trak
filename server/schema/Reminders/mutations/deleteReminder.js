const { GraphQLNonNull, GraphQLID } = require('graphql');
const ReminderType = require("../types/ReminderType");
const Reminder = require("../../../models/Reminders/Reminder");

const deleteReminder = {
    type: ReminderType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
        return Reminder.findByIdAndRemove(args.id);
    }
}

module.exports = deleteReminder;