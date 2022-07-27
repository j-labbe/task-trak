import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import LandingIllustration from '../assets/images/LandingIllustration';
import config from '../config';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const StyledScroller = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .scroller {
        height: 1.2em;
        line-height: 1.2em;
        position: relative;
        overflow: hidden;
        width: 100%;
    }
    .scroller > span {
        position: absolute;
        top: 0;
        left: 0;
        animation: slide 8s infinite;
        font-weight: bold;
        width: 100%;
    }

    @keyframes slide {
        0% {
            top: 0;
        }
        25% {
            top: -1.2em;
        }
        50% {
            top: -2.4em;
        }
        75% {
            top: -3.6em;
        }
    }
`

export default function LandingPage() {

    const navigate = useNavigate();

    return (
        <Seo title="Home">
            <Container maxW={'5xl'}>
                <Stack
                    textAlign={'center'}
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'} width={"100%"}>
                        <StyledScroller>
                            <div className="scroller">
                                <span>
                                    Reminders<br />
                                    Project Management<br />
                                    Scheduling<br />
                                    Tasks<br />
                                </span>
                            </div>
                            <Text as={'span'} color={'blue.400'}>
                                made easy
                            </Text>
                        </StyledScroller>
                    </Heading>
                    <Text color={'gray.500'} maxW={'3xl'}>
                        {config.shortDescription}
                    </Text>
                    <Stack spacing={6} direction={'row'}>
                        <Button
                            onClick={() => navigate("/onboarding")}
                            rounded={'full'}
                            px={6}
                            colorScheme={'blue'}
                            bg={'blue.400'}
                            _hover={{ bg: 'blue.500', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}>
                            Get started
                        </Button>
                        <Button rounded={'full'} px={6}>
                            Learn more
                        </Button>
                    </Stack>
                    <Flex direction={'row'} alignItems={"center"} justifyContent={"center"}>
                        <Flex direction="column" w="50%">
                            <Heading as="h3" fontSize="lg" fontWeight="600" color="gray.500">
                                How it works
                            </Heading>
                        </Flex>
                        <Flex direction="column" w="50%">
                            <LandingIllustration
                                height={{ sm: '24rem', lg: '510.67538' }}
                                mt={{ base: 10, sm: -10, lg: -100 }}
                            />
                        </Flex>
                    </Flex>
                    <Flex w={'full'}>

                    </Flex>
                </Stack>
            </Container>
            <Footer />
        </Seo >
    );
}