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
import { UPDATE_REMINDER } from '../mutations/reminderMutations';
import DatePicker from "./DatePicker";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorBoundary from './ErrorBoundary';


export default function AddReminderModal({ id, name, description, reminderDateTime, status }) {
    const { user } = useAuth0();
    

    

    return (
        <ErrorBoundary>
            <Modal isOpen={isOpen || showSpinner} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{reminderName}</ModalHeader>
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
        </ErrorBoundary>
    )
}