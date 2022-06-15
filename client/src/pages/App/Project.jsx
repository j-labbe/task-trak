import { useState } from "react";
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
    AlertDescription
} from "@chakra-ui/react";
import Spinner from "../../components/Spinner";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../queries/ProjectQueries";
import Status from "../../components/Status";
import ClientInfo from "../../components/ClientInfo";
import { FaPen, FaSave } from "react-icons/fa";
import DeleteProject from "../../components/DeleteProject";
import { GET_CLIENTS } from "../../queries/ClientQueries";
import { UPDATE_PROJECT } from "../../mutations/projectMutations";
import Seo from "../../components/Seo";

export default function Project() {

    const [projectName, setProjectName] = useState(""); // for site title

    const [editMode, setEditMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id }
    });

    const clients = useQuery(GET_CLIENTS);

    const convertStatus = (status) => {
        switch (status) {
            case "Not Started":
                return "new";
            case "In Progress":
                return "progress";
            case "Completed":
                return "completed";
            default:
                return "new";
        }
    }

    const handleEditMode = () => {
        setStatus(convertStatus(data.project.status));
        setName(data.project.name);
        setDescription(data.project.description);
        setClientId(data.project.client?.id);
        setEditMode(true);
    }

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: id, name, description, status, clientId },
        refetchQueries: [{ query: GET_PROJECT, variables: { id } }]
    });


    const onSubmit = () => {
        if (!name || !description || !clientId || !status || name === "" || description === "" || clientId === "" || status === "") {
            return setShowAlert(true);
        }
        setShowAlert(false);
        setShowSpinner(true);
        console.log(id, name, description, status, clientId);
        updateProject(id, name, description, status, clientId);
        setShowSpinner(false);
        setEditMode(false);
    }

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    setProjectName(data.project.name);

    return (
        <Seo title={`${projectName} • TaskTrak`}>
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
                                        <Link to={"/"} style={{ width: "90px" }}>Go Back</Link>
                                    </Button>
                                    <Menu>
                                        <MenuButton as={Button} rounded="md" cursor="pointer" variant="solid" colorScheme="blue" size="sm">Actions</MenuButton>
                                        <MenuList alignItems={"center"} maxW={50}>
                                            <MenuItem onClick={handleEditMode}><FaPen style={{ marginRight: "10px" }} />Edit</MenuItem>
                                            <MenuItem color="red.500" as="p">
                                                <DeleteProject projectId={id} />
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                            )}
                        </Flex>

                        {/* obviously this is a mess, but it works for now ¯\_(ツ)_/¯ */}
                        {editMode ? clients.loading ? <Spinner /> : clients.error ? setEditMode(false) : (

                            <Box>
                                <Heading mb={5} mt={5}>Editing Project</Heading>

                                <label><strong>Status*</strong></label>
                                <Select onChange={(e) => setStatus(e.target.value)} placeholder="Select Status" mb={3} value={status}>
                                    <option value="new">Not Started</option>
                                    <option value="progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Select>

                                <label><strong>Name*</strong></label>
                                <Input onChange={(e) => setName(e.target.value)} placeholder="Enter Name" mb={3} value={name} />

                                <label><strong>Description*</strong></label>
                                <Textarea onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" mb={3} value={description} />

                                <label><strong>Client*</strong></label>
                                <Select onChange={(e) => setClientId(e.target.value)} placeholder="Select Client" mb={3} value={clientId}>
                                    {clients.data.clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </Select>
                            </Box>
                        ) : (
                            <>
                                <Status status={data.project.status} />
                                <Heading fontSize="52px" mb={5} mt={2}>{data.project.name}</Heading>
                                <Text fontSize="lg" mb={2}>{data.project.description}</Text>
                                <ClientInfo client={data.project.client} />
                            </>
                        )}
                    </Flex>
                </Box >
            )
            }
        </Seo>
    )
}
