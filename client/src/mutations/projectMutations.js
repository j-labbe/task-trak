import { gql } from "@apollo/client";

/**
 * Passing the userId as a variable to the query is not strictly necessary for the query to work.
 * However, it is a good idea for a level of security so that the only person who can mutate the data
 * is the user who created it (or someone who has knowledge of the userId and projectId).
 */

// GraphQL mutation to add a project
export const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $clientId: ID!, $status: ProjectStatus!, $userId: String!) {
        addProject(name: $name, description: $description, clientId: $clientId, status: $status, belongsTo: $userId) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

// GraphQL mutation to edit a project
export const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!, $clientId: String!, $userId: String!) {
        updateProject(name: $name, description: $description, status: $status, clientId: $clientId, belongsTo: $userId) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;