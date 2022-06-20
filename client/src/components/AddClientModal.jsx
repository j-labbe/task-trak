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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { FaUser } from "react-icons/fa";
import Spinner from './Spinner';
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { useAuth0 } from "@auth0/auth0-react";


export default function AddClientModal() {
    const { user } = useAuth0();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name,
            phone,
            email,
            userId: user.sub
        },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS, variables: { userId: user.sub } });
            cache.writeQuery({
                query: GET_CLIENTS,
                variables: { userId: user.sub },
                data: { clients: [...clients, addClient] }
            });
        }
    })

    const onSubmit = () => {
        if (name === "" || phone === "" || email === "") {
            return setShowAlert(true);
        }
        setShowAlert(false);
        setShowSpinner(true);
        addClient(name, email, phone);
        setShowSpinner(false);
        onClose();
    }


    return (
        <>
            <Button onClick={onOpen} m={5} mr={2}>
                <Flex alignItems={'center'} justifyContent={"center"}>
                    <FaUser style={{ marginRight: "10px" }} />Add Client
                </Flex>
            </Button>
            <Modal isOpen={isOpen || showSpinner} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Client</ModalHeader>
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
                                    <label>Email*</label>
                                    <Input onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" mb={3} />
                                    <label>Phone*</label>
                                    <Input onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" mb={3} />
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
    )
}