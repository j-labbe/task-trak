import React from 'react';
import { Grid, VStack, Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import NavigationCard from '../../components/NavigationCard';
import { ImStack } from "react-icons/im";
import { AiOutlineUnorderedList } from "react-icons/ai";
import config from '../../config';
import Seo from '../../components/Seo';

export default function AppHome() {
    const [isDesktop] = useMediaQuery('(min-width: 900px)');
    return (
        <Seo title="App">
            <Grid minH="100vh" p={3}>
                <VStack maxW="100%" spacing={8}>
                    <Heading size="2xl" mt={10}>Welcome, Jack Labbe!</Heading>
                    <Heading size="md">Effortlessly stay on track.</Heading>
                    <Flex direction={isDesktop ? "row" : "column"} alignItems={"center"} justifyContent={"center"} maxW={"100%"} flexWrap="initial">
                        {/* two cards, each for the different app sections */}
                        <NavigationCard
                            icon={<ImStack size={50} color="rgba(66, 153, 225, 1)" />}
                            title="Project Management"
                            description="Keep on top of your projects."
                            link={config.routes.projectMgmt.root}
                        />
                        <NavigationCard
                            icon={<AiOutlineUnorderedList size={50} color="rgba(66, 153, 225, 1)" />}
                            title="Reminders"
                            description="Don't forget anything."
                            link={config.routes.reminders.root}
                        />
                    </Flex>
                </VStack>
            </Grid>
        </Seo>
    )
}