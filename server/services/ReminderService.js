/**
 * The basic idea is to check each hour for any reminders that are due in that hour.
 * If there are any, then we send a notification to the user at the specified time.
 * 
 * The notification will be sent to the user's email (for now).
 */

const schedule = require("node-schedule");
const sendMail = require("./mail");
const Reminder = require("../models/Reminders/Reminder");

const status = {
    notInitialized: "notInitialized",
    scheduled: "scheduled",
    done: "done",
    error: "error",
    cancelled: "cancelled",
}

class ReminderService {
    constructor(notification) {
        this.id = notification.id;
        this.reminderDateTime = notification.reminderDateTime;
        this.name = notification.name;
        this.email = notification.email;
        this.message = notification.description;
        this.link = notification.link;
        this.shouldSendEmail = notification.shouldSendEmail;
        this.status = status.notInitialized;

        this.updateReminder = this.updateReminder.bind(this);
        this.scheduleJob = this.scheduleJob.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.cancelJob = this.cancelJob.bind(this);

        this.scheduleJob(notification);

        // TODO: handle SIGINT, SIGTERM, etc.
        // We want to reinitialize the job if the server is restarted.
        // Dump services to JSON somewhere and load them back up.
    }

    get status() {
        return this.status;
    }

    updateReminder() {
        // update the reminder in the database to completed
        Reminder.findByIdAndUpdate(this.id, {
            $set: {
                status: true
            }
        });
    }

    scheduleJob() {
        this.status = status.scheduled;
        this.job = schedule.scheduleJob(this.id, this.reminderDateTime, async () => {
            if (this.shouldSendEmail) {
                sendMail(this.email, this.name, this.message, this.link);
            }
            // update the reminder in the database to completed
            this.updateReminder();
            this.status = status.done;
        });
    }

    updateJob(reminderDateTime) {
        this.job.reschedule(reminderDateTime);
        this.status = status.scheduled;
    }

    cancelJob() {
        this.job.cancel();
        this.status = status.cancelled;
    }
}

module.exports = { ReminderService, status };