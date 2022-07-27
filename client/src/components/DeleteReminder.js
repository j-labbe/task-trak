import { Text, Flex } from "@chakra-ui/react";
import { GET_REMINDERS } from "../queries/ReminderQueries";
import { DELETE_REMINDER } from "../mutations/reminderMutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ConfirmActionModal from "./ConfirmActionModal";
import { FaTrash } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../config";

export default function DeleteReminder({ reminderId }) {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const [deleteReminder] = useMutation(DELETE_REMINDER, {
        variables: { id: reminderId },
        onCompleted: () => navigate(config.routes.reminders.root),
        refetchQueries: [{ query: GET_REMINDERS, variables: { userId: user.sub } }]
    });
    return (
        <ConfirmActionModal
            actionBtn={{
                colorScheme: "red",
                variant: "outline",
                size: "sm",
                ml: 3,
                text: "Delete",
            }}
            actionText={<Text align="center">Are you sure you would like to delete this reminder?<br /><br /><strong>This action cannot be undone.</strong></Text>}
            onConfirm={deleteReminder}
        />
    );
}