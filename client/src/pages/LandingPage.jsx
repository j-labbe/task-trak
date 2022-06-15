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
                            rounded={'full'}
                            px={6}
                            colorScheme={'blue'}
                            bg={'blue.400'}
                            _hover={{ bg: 'blue.500' }}>
                            Get started
                        </Button>
                        <Button rounded={'full'} px={6}>
                            Learn more
                        </Button>
                    </Stack>
                    <Flex w={'full'}>
                        <LandingIllustration
                            height={{ sm: '24rem', lg: '809.67538' }}
                            mt={{ base: 10, sm: 10, lg: 0 }}
                        />
                    </Flex>
                </Stack>
            </Container>
        </Seo>
    );
}