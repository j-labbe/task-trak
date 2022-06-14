import React from 'react';
import { Grid, VStack, Flex } from '@chakra-ui/react';
import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import Clients from '../components/Clients';
import AddProjectModal from '../components/AddProjectModal';

export default function Home() {
    return (
        <Grid minH="100vh" minW="1000px" p={3}>
            <VStack minWidth="1000px" spacing={8}>
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