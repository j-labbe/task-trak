import { gql } from "@apollo/client";

// GraphQL mutation to add a project
export const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $clientId: ID!, $status: ProjectStatus!) {
        addProject(name: $name, description: $description, clientId: $clientId, status: $status) {
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
    mutation UpdateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!, $clientId: String!) {
        updateProject(name: $name, description: $description, status: $status, clientId: $clientId) {
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