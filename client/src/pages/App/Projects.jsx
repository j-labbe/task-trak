import React from 'react';
import { Grid, VStack, Flex, Heading } from '@chakra-ui/react';
import AddClientModal from '../../components/AddClientModal';
import Projects from '../../components/Projects';
import Clients from '../../components/Clients';
import AddProjectModal from '../../components/AddProjectModal';
import Seo from '../../components/Seo';
import Footer from '../../components/Footer';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from '../../components/Spinner';
import FadeIn from "react-fade-in";
import styled from '@emotion/styled';

function ProjectMgmtPage() {
    return (
        <FadeIn>
            <Seo title="Project Management">
                <Grid minH="100vh" minW="1000px" p={3}>
                    <VStack minWidth="1000px" spacing={8}>
                        <Heading mt={10}>Project Management</Heading>
                        <Flex direction="row">
                            <AddClientModal />
                            <AddProjectModal />
                        </Flex>
                        <Projects />
                        <Clients />
                    </VStack>
                </Grid>
                <Footer />
            </Seo>
        </FadeIn>
    )
}

export default withAuthenticationRequired(ProjectMgmtPage, {
    onRedirecting: () => <Spinner />,
});