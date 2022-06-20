import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    query getProjects ($userId: String!) {
        projects (userId: $userId) {
            id
            name
            description
            status
        }
    }
`;

const GET_PROJECT = gql`
    query getProject($id: ID!, $userId: String!) {
        project(id: $id, userId: $userId) {
            id,
            name,
            description,
            status,
            client {
                id,
                name,
                email,
                phone
            }
        }
    }
`;

export { GET_PROJECTS, GET_PROJECT };