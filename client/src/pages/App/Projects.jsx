import React from 'react';
import { Grid, VStack, Flex, Heading } from '@chakra-ui/react';
import AddClientModal from '../../components/AddClientModal';
import Projects from '../../components/Projects';
import Clients from '../../components/Clients';
import AddProjectModal from '../../components/AddProjectModal';

export default function ProjectMgmtPage() {
    return (
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
    )
}