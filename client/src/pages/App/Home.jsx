import React from 'react';
import { Grid, VStack, Flex, Heading } from '@chakra-ui/react';

export default function Home() {
    return (
        <Grid minH="100vh" minW="1000px" p={3}>
            <VStack minWidth="1000px" spacing={8}>
                <Heading size="md">Effortlessly stay on track.</Heading>
                <Flex direction="row">
                    {/* two cards, each for the different app sections */}
                </Flex>
            </VStack>
        </Grid>
    )
}