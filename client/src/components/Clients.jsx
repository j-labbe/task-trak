import { useQuery } from '@apollo/client';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Heading
} from '@chakra-ui/react';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/ClientQueries';
import Spinner from './Spinner';


export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (
        <div>
            <Heading mb={3}>Clients</Heading>
            {!loading && !error && (
                <>
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Phone</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.clients.map(client => (
                                    <ClientRow key={client.id} client={client} />
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    );
}