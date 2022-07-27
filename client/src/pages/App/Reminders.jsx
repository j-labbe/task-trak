import React from 'react';
import { Grid, VStack, Heading } from '@chakra-ui/react';
import Seo from '../../components/Seo';
import Footer from '../../components/Footer';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from '../../components/Spinner';
import FadeIn from "react-fade-in";
import AddReminderModal from "../../components/AddReminderModal";
import ReminderList from '../../components/ReminderList';

function ReminderPage() {
    return (
        <FadeIn>
            <Seo title="Project Management">
                <Grid minH="100vh" minW="1000px" p={3}>
                    <VStack minWidth="1000px" spacing={8}>
                        <Heading mt={10}>Reminders</Heading>
                        <AddReminderModal />
                        <ReminderList />
                    </VStack>
                </Grid>
                <Footer />
            </Seo>
        </FadeIn>
    )
}

export default withAuthenticationRequired(ReminderPage, {
    onRedirecting: () => <Spinner />,
});