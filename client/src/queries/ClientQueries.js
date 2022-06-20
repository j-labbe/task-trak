import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
    query getClients ($userId: String!) {
        clients (userId: $userId) {
            id
            name
            email
            phone
        }
    }
`;

export { GET_CLIENTS };