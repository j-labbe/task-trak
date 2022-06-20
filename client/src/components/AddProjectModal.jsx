import { useState } from 'react';
import { 
    Modal, 
    ModalOverlay,
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    useDisclosure, 
    Button, 
    Flex, 
    Input, 
    Textarea, 
    Alert, 
    AlertIcon, 
    AlertTitle, 
    AlertDescription,  
    Select 
} from '@chakra-ui/react';
import { FaList } from "react-icons/fa";
import Spinner from './Spinner';
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { useAuth0 } from "@auth0/auth0-react";


export default function AddProjectModal() {
    const { user } = useAuth0();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new'); // enum: new, progress, completed

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId, userId: user.sub },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS, variables: { userId: user.sub } });
            cache.writeQuery({
                query: GET_PROJECTS,
                variables: { userId: user.sub },
                data: { projects: [...projects, addProject] }
            });
        }
    });

    // Get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS, { variables: { userId: user.sub } });

    const onSubmit = () => {
        if (name === "" || description === "" || status === "") {
            return setShowAlert(true);
        }
        setShowAlert(false);
        setShowSpinner(true);
        addProject(name, description, status, clientId);
        setShowSpinner(false);
        onClose();
    }

    if (loading) return <Spinner />;
    if (error) {
        onClose();
        console.error(error);
    }


    return (
        <>
            {!loading && !error && (
                <>

                    <Button onClick={onOpen} m={5} ml={2}>
                        <Flex alignItems={'center'} justifyContent={"center"}>
                            <FaList style={{ marginRight: "10px" }} />Add Project
                        </Flex>
                    </Button>
                    <Modal isOpen={isOpen || showSpinner} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add Project</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {showSpinner ? <Spinner /> : (
                                    <>
                                        {showAlert && (
                                            <Alert status="error">
                                                <AlertIcon />
                                                <AlertTitle mr={2}>Error</AlertTitle>
                                                <AlertDescription>Please fill in all required fields.</AlertDescription>
                                            </Alert>
                                        )}
                                        <Flex flexDirection={'column'}>
                                            <label>Name*</label>
                                            <Input onChange={(e) => setName(e.target.value)} placeholder="Enter Name" mb={3} />
                                            <label>Description*</label>
                                            <Textarea onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" mb={3} />
                                            <label>Status*</label>
                                            <Select onChange={(e) => setStatus(e.target.value)} placeholder="Select Status" mb={3} value={status}>
                                                <option value="new">Not Started</option>
                                                <option value="progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </Select>
                                            <label>Client*</label>
                                            <Select onChange={(e) => setClientId(e.target.value)} placeholder="Select Client" mb={3} value={clientId}>
                                                {data.clients.map(client => (
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                ))}
                                            </Select>
                                        </Flex>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="ghost" disabled={showSpinner} onClick={onClose} mr={3}>Cancel</Button>
                                <Button colorScheme={"blue"} mr={3} onClick={onSubmit}>Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </>
            )}
        </>
    )
}