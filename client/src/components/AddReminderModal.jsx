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
    Select,
} from '@chakra-ui/react';
import { FaCalendar } from "react-icons/fa";
import Spinner from './Spinner';
import { useMutation } from "@apollo/client";
import { GET_REMINDERS } from '../queries/ReminderQueries';
import { ADD_REMINDER } from '../mutations/reminderMutations';
import DatePicker from "./DatePicker";
import { useAuth0 } from "@auth0/auth0-react";


export default function AddReminderModal() {
    const { user } = useAuth0();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);
    const [description, setDesc] = useState('');
    const [reminderDateTime, setReminderDateTime] = useState('');

    const [addReminder] = useMutation(ADD_REMINDER, {}, { refetchQueries: [{ query: GET_REMINDERS, variables: { userId: user.sub } }] });

    const onSubmit = () => {
        if (name === "" || !reminderDateTime) {
            return setShowAlert(true);
        }
        setShowAlert(false);
        setShowSpinner(true);
        addReminder(name, description, reminderDateTime, !!status, user.sub);
        setShowSpinner(false);
        onClose();
    }


    return (
        <>
            <Button onClick={onOpen} m={5} mr={2}>
                <Flex alignItems={'center'} justifyContent={"center"}>
                    <FaCalendar style={{ marginRight: "10px" }} />Add Reminder
                </Flex>
            </Button>
            <Modal isOpen={isOpen || showSpinner} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Reminder</ModalHeader>
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
                                    <Input onChange={(e) => setName(e.target.value)} placeholder="Enter Reminder Name" mb={3} />
                                    <label>Description*</label>
                                    <Input onChange={(e) => setDesc(e.target.value)} placeholder="Enter a description" mb={3} />
                                    <label>Status*</label>
                                    <Select onChange={(e) => setStatus(e.target.value)} placeholder="Select a status" mb={3}>
                                        <option value={true}>Completed</option>
                                        <option value={false}>Not completed</option>
                                    </Select>
                                    <label>Reminder Time*</label>
                                    <DatePicker onChange={(date) => setReminderDateTime(date)} />
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