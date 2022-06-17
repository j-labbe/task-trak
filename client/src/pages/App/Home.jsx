import React from 'react';
import { Grid, VStack, Flex, Heading, useMediaQuery, Avatar } from '@chakra-ui/react';
import NavigationCard from '../../components/NavigationCard';
import { ImStack } from "react-icons/im";
import { AiOutlineUnorderedList } from "react-icons/ai";
import config from '../../config';
import Seo from '../../components/Seo';
import Footer from '../../components/Footer';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from '../../components/Spinner';
import FadeIn from "react-fade-in";
import { useAuth0 } from "@auth0/auth0-react";
import generateHeading from '../../utils/generateHeading';

function AppHome() {
    const [isDesktop] = useMediaQuery('(min-width: 900px)');
    const { user } = useAuth0();
    const name = (user && user.given_name && user.family_name) ? `${user.given_name} ${user.family_name}!` : "";
    const punc = name ? "," : "!";
    return (
        <FadeIn>
            <Seo title="App">
                <Grid minH="100vh" p={3}>
                    <VStack maxW="100%" spacing={8}>
                        <Avatar size="xl" name={name} src={user.picture} mt={5} />
                        <Heading size="2xl" mt={5}>Welcome{punc} {name}</Heading>
                        <Heading size="md">{generateHeading()}</Heading>
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
                <Footer />
            </Seo>
        </FadeIn>
    )
}

export default withAuthenticationRequired(AppHome, {
    onRedirecting: () => <Spinner />,
});