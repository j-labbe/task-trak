import { useState } from 'react';
import { Flex, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, ModalFooter, Alert, AlertIcon, AlertTitle, AlertDescription, ModalBody, Heading, Box, Textarea, Input } from "@chakra-ui/react";
import { parseISO, format } from 'date-fns';
import { useMutation } from '@apollo/client';
import { UPDATE_REMINDER, DELETE_REMINDER } from '../mutations/reminderMutations';
import { GET_REMINDERS } from '../queries/ReminderQueries';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Status from './Status';
import DatePicker from './DatePicker';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteReminder from './DeleteReminder';

export default function Reminder({ name, status, description, reminderDateTime, id }) {

    const { user } = useAuth0();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [isComplete, setIsComplete] = useState(status);

    const [isEditing, setIsEditing] = useState(false);
    const [nameInput, setNameInput] = useState(name);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const [reminderDateTimeInput, setReminderDateTimeInput] = useState(reminderDateTime);

    const [updateReminder] = useMutation(UPDATE_REMINDER, {}, { refetchQueries: [{ query: GET_REMINDERS, variables: { userId: user.sub } }] });

    const [deleteReminder] = useMutation(DELETE_REMINDER, { variables: { id } }, {
        refetchQueries: [{ query: GET_REMINDERS, variables: { userId: user.sub } }]
    });

    const handleComplete = () => {
        const newStatus = !isComplete;
        setIsComplete(newStatus);
        updateReminder({ variables: { id, status: newStatus, name, reminderDateTime, description } });
    }

    const handleEditSubmit = () => {
        setShowSpinner(true);
        updateReminder({
            variables: {
                id,
                status: isComplete,
                name: nameInput,
                reminderDateTime: reminderDateTimeInput,
                description: descriptionInput
            }
        });
        setIsEditing(false);
        setShowSpinner(false);
    }

    const handleDeleteReminder = () => {
        setShowSpinner(true);
        deleteReminder(id);
        setShowSpinner(false);
        onClose();
    }

    const editMode = () => {
        setIsEditing(true);
    }

    const date = format(parseISO(reminderDateTime), 'MMM dd, yyyy - h:mm a (O)');

    return (
        <>
            <Modal isOpen={isOpen || showSpinner} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex direction="row" alignContent="center" justifyContent="space-around">
                            {nameInput}
                            <Box fontSize="md" p={0}>
                                <Status status={isComplete} alternate mt="0px" />
                            </Box>
                        </Flex>
                    </ModalHeader>
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

                                    {isEditing ? (
                                        <>
                                            <Heading as="h3" fontSize="md">Name*</Heading>
                                            <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                                            <Heading as="h3" fontSize="md">Description*</Heading>
                                            <Textarea value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)} />
                                        </>
                                    ) : (
                                        <Text>{description}</Text>
                                    )}

                                    <Heading as="h3" fontSize="md" mt={3}>Time{isEditing ? "*" : ":"}</Heading>
                                    {isEditing ? (
                                        <DatePicker onChange={(date) => setReminderDateTimeInput(date)} />
                                    ) : (
                                        <Text>{date}</Text>
                                    )}

                                </Flex>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Flex direction="row" justifyContent="space-between" alignItems="center" w="100%">
                            <Button colorScheme="blue" variant={isComplete ? "solid" : "outline"} onClick={handleComplete}>
                                <Box p={1} borderStyle="solid" borderWidth="1px" borderColor="blue.400" minW="24px" maxW="24px" minH="24px" maxH="24px" w="24px" h="24px" borderRadius="full" mr={3}></Box>
                                Mark {isComplete ? "Incomplete" : "Complete"}
                            </Button>
                            {isEditing ? (
                                <Box ml={3}>
                                    <Flex direction="row">
                                        <Button variant="ghost" disabled={showSpinner} onClick={() => setIsEditing(false)} mr={3} size="sm">Cancel</Button>
                                        <Button colorScheme={"blue"} size="sm" onClick={handleEditSubmit}>Submit</Button>
                                    </Flex>
                                </Box>
                            ) : (
                                <Box ml={3}>
                                    <Button variant="solid" onClick={editMode} size="sm">Edit</Button>
                                    <DeleteReminder reminderId={id} />
                                </Box>
                            )}
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex direction="row" justify="flex-start" p={3} w="100%" mb={2}>
                <Button colorScheme="blue" variant={isComplete ? "solid" : "outline"} p="0" minW="24px" maxW="24px" minH="24px" maxH="24px" w="24px" h="24px" borderRadius="full" onClick={handleComplete} mr={3} mt={1}></Button>
                <Button onClick={onOpen} variant="ghost" textAlign="left" pt={4} pb={4} pl={1} w="100%" borderBottomLeftRadius="0" borderBottomRadius="0" borderBottom={isComplete ? "#FEB2B2" : "#4299E1"} borderTop="transparent" borderX="transparent" borderWidth="1px" borderStyle="solid">
                    <Flex direction="column" justifyContent="center" w="100%" pt={2} pb={2} transition="100ms all cubic-bezier(0.4, 0, 1, 1)">
                        <Text lineHeight="1.2em" color={isComplete ? "red.200" : ""} style={{ textDecoration: isComplete ? "line-through" : "" }} transition="100ms all cubic-bezier(0.4, 0, 1, 1)">{name}</Text>
                        <Text lineHeight="1.2em" color={isComplete ? "red.200" : ""} transition="100ms all cubic-bezier(0.4, 0, 1, 1)"><small>{date}</small></Text>
                    </Flex>
                </Button>
            </Flex>
        </>
    )
}
