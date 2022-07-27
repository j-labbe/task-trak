import { Flex, Box } from "@chakra-ui/react";
import Reminder from "./Reminder";
import FadeIn from "react-fade-in";
import { useQuery } from "@apollo/client";
import { GET_REMINDERS } from "../queries/ReminderQueries";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";
import ErrorBoundary from "./ErrorBoundary";

export default function ReminderList() {

    const { user } = useAuth0();

    // get the reminders from database using graphql
    const { loading, error, data } = useQuery(GET_REMINDERS, { variables: { userId: user.sub } });

    if (loading) return <FadeIn><Spinner /></FadeIn>;
    if (error) return <p>Something went wrong</p>;

    // TODO: Get the reminders from the database and render them here.
    // TODO: add a dropdown to filter the reminders by status
    // TODO: update status of the reminder when clicking complete button (in Reminder component)
    // TODO: show the reminder details when clicking the reminder

    return (
        <ErrorBoundary>
            <Flex direction="column" maxW="500px" w="100%">
                <FadeIn>
                    {data && data.reminders.length > 0 ? data.reminders.map(reminder => {
                        return <Reminder key={reminder?.id} name={reminder?.name} status={reminder?.status} description={reminder?.description} reminderDateTime={reminder?.reminderDateTime} id={reminder?.id} />
                    }) : "No reminders found"}
                </FadeIn>
            </Flex>
        </ErrorBoundary>
    );
}