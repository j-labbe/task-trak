const { gql } = require('@apollo/client');

const ADD_REMINDER = gql`
    mutation addReminder ($name: String!, $description: String!, $reminderDateTime: String!, $status: Boolean!, $userId: String!) {
        addReminder (name: $name, description: $description, reminderDateTime: $reminderDateTime, status: $status, belongsTo: $userId) {
            id
            name
            description
            reminderDateTime
            status
        }
    }
`;

const UPDATE_REMINDER = gql`
mutation updateReminder ($id: ID!, $name: String!, $description: String!, $reminderDateTime: String!, $status: Boolean!) {
    updateReminder (id: $id, name: $name, description: $description, reminderDateTime: $reminderDateTime, status: $status) {
        id
        name
        description
        reminderDateTime
        status
    }
}
`;

const DELETE_REMINDER = gql`
mutation deleteReminder ($id: ID!) {
    deleteReminder (id: $id) {
        id
    }
}
`;

export { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER };