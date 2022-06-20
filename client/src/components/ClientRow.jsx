import { useState } from "react";
import { SlideFade, Tr, Td, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import ConfirmActionModal from "./ConfirmActionModal";
import { useAuth0 } from "@auth0/auth0-react";

export default function ClientRow({ client }) {

    const { user } = useAuth0();
    const [isValid, setIsValid] = useState(true);

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id
        },
        refetchQueries: [{ query: GET_CLIENTS, variables: { userId: user.sub } }, { query: GET_PROJECTS, variables: { userId: user.sub } }]
    });

    const handleDeleteClient = () => {
        setIsValid(false);
        setTimeout(() => deleteClient(), 100);
    }

    return (
        <Tr w="100%">
            <Td>
                <SlideFade in={isValid}>
                    {client.name}
                </SlideFade>
            </Td>
            <Td>
                <SlideFade in={isValid}>
                    {client.email}
                </SlideFade>
            </Td>
            <Td>
                <SlideFade in={isValid}>
                    {client.phone}
                </SlideFade>
            </Td>
            <Td>
                <SlideFade in={isValid}>
                    <ConfirmActionModal
                        actionBtn={{
                            colorScheme: "red",
                            variant: "outline",
                            text: <FaTrash />,
                            size: "sm"
                        }}
                        actionText={
                            <Text textAlign="center">
                                Are you sure you want to delete client <strong>{client.name}</strong> and all associated projects?
                                <br />
                                <br />
                                <strong>This action cannot be undone.</strong>
                            </Text>}
                        onConfirm={handleDeleteClient}
                    />
                </SlideFade>
            </Td>
        </Tr>
    );
}