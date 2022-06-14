import { Text, Flex } from "@chakra-ui/react";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ConfirmActionModal from "./ConfirmActionModal";
import { FaTrash } from "react-icons/fa";

export default function DeleteProject({ projectId, children }) {
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }]
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