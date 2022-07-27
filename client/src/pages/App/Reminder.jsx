import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Input,
    Textarea,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    ControlBox
} from "@chakra-ui/react";
import Spinner from "../../components/Spinner";
import { useQuery, useMutation } from "@apollo/client";
import Status from "../../components/Status";
import { FaPen, FaSave } from "react-icons/fa";
import { GET_REMINDER } from "../../queries/ReminderQueries";
import { UPDATE_REMINDER } from "../../mutations/reminderMutations";
import Seo from "../../components/Seo";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FadeIn from "react-fade-in";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteReminder from "../../components/DeleteReminder";
import { parseISO, format } from 'date-fns';

function Reminder() {

    const { user } = useAuth0();
    const [reminderName, setReminderName] = useState("Reminder"); // for site title

    const [editMode, setEditMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_REMINDER, {
        variables: { id, userId: user.sub }
    });

    useEffect(() => {
        if (!loading && !error && data) {
            setReminderName(data.reminder.name);
        }
    }, [data]);

    const handleEditMode = () => {
        setStatus(data.reminder.status);
        setName(data.reminder.name);
        setDescription(data.reminder.description);
        setEditMode(true);
    }

    const [updateReminder] = useMutation(UPDATE_REMINDER, {
        variables: { id: id, name, description, status, userId: user.sub },
        refetchQueries: [{ query: GET_REMINDER, variables: { id: id, userId: user.sub } }]
    });


    const onSubmit = () => {
        if (!name || !description || !status) {
            return setShowAlert(true);
        }
        setShowAlert(false);
        setShowSpinner(true);
        updateReminder(id, name, description, status);
        setShowSpinner(false);
        setEditMode(false);
    }

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    const date = format(parseISO(data.reminder.reminderDateTime), 'MMM dd, yyyy - h:mm a (O)');

    return (
        <Seo title={reminderName}>
            {!loading && !error && (
                <Box p={5} w={"75%"} m="auto">
                    {showAlert && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle mr={2}>Error</AlertTitle>
                            <AlertDescription>Please fill in all required fields.</AlertDescription>
                        </Alert>
                    )}
                    <Flex direction="column" alignItems="center" p={6}>
                        <Flex direction="row" justifyContent="space-between" alignItems="center" w="80%">
                            {editMode ? (
                                <>
                                    <Button variant="outline" colorScheme="blue" size={"sm"} m={0} alignSelf="flex-start" onClick={() => setEditMode(false)}>Cancel</Button>
                                    {showSpinner && <Spinner />}
                                    <Button variant="solid" colorScheme="blue" size={"sm"} m={0} onClick={onSubmit}><FaSave style={{ marginRight: "10px" }} />Save</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline" colorScheme="blue" size={"sm"} p={0} m={0} alignSelf="flex-start">
                                        <Link to={-1} style={{ width: "90px" }}>Go Back</Link>
                                    </Button>

                                    <Menu>
                                        <MenuButton as={Button} rounded="md" cursor="pointer" variant="solid" colorScheme="blue" size="sm">Actions</MenuButton>
                                        <MenuList alignItems={"center"} maxW={50}>
                                            <MenuItem onClick={handleEditMode}><FaPen style={{ marginRight: "10px" }} />Edit</MenuItem>
                                            <MenuItem color="red.500" as="p">
                                                <DeleteReminder reminderId={id} />
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                            )}
                        </Flex>

                        {/* obviously this is a mess, but it works for now ¯\_(ツ)_/¯ */}
                        {editMode ? (
                            <>
                                <Heading mb={5} mt={5}>Editing Project</Heading>
                                <FadeIn>
                                    <Select onChange={(e) => setStatus(e.target.value)} placeholder="Select Status" mb={3} value={status}>
                                        <option value={false}>Incomplete</option>
                                        <option value={true}>Completed</option>
                                    </Select>

                                    <label><strong>Name*</strong></label>
                                    <Input onChange={(e) => setName(e.target.value)} placeholder="Enter Name" mb={3} value={name} />

                                    <label><strong>Description*</strong></label>
                                    <Textarea onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" mb={3} value={description} />
                                </FadeIn>
                            </>
                        ) : (
                            <FadeIn>
                                <Status status={data.reminder.status} alternate />
                                <Heading fontSize="52px" mb={5} mt={2}>{data.reminder.name}</Heading>
                                <Text fontSize="lg" mb={2}>{data.reminder.description}</Text>
                                <Text fontSize="md">{date}</Text>
                            </FadeIn>
                        )}
                    </Flex>
                </Box>
            )
            }
        </Seo>
    )
}

export default withAuthenticationRequired(Reminder, {
    onRedirecting: () => <Spinner />
});