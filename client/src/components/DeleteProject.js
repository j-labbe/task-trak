import { Text, Flex } from "@chakra-ui/react";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ConfirmActionModal from "./ConfirmActionModal";
import { FaTrash } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

export default function DeleteProject({ projectId, children }) {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate("/app/projectmgmt"),
        refetchQueries: [{ query: GET_PROJECTS, variables: { userId: user.sub } }]
    });
    return (
        <ConfirmActionModal 
            actionBtn={{
                colorScheme: "red",
                variant: "link",
                text: <><Flex direction="row" alignItems="center"><FaTrash style={{marginRight: "10px"}} /><Text>Delete</Text></Flex></>,
            }} 
            actionText={<Text align="center">Are you sure you would like to delete this project?<br /><br /><strong>This action cannot be undone.</strong></Text>}
            onConfirm={deleteProject}
        />
    );
}