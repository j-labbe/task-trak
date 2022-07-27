import { gql } from '@apollo/client';

const GET_REMINDERS = gql`
    query getReminders ($userId: String!) {
        reminders (userId: $userId) {
            id
            name
            description
            reminderDateTime
            status
        }
    }
`;

const GET_REMINDER = gql`
    query getReminder ($id: ID!, $userId: String!) {
        reminder (id: $id, userId: $userId) {
            id
            name
            description
            reminderDateTime
            status
        }
    }
`;

export { GET_REMINDERS, GET_REMINDER };