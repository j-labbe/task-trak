import React, { useState, useContext, useEffect } from 'react';
import { NavContext } from '../../contexts/NavConfig';
import { Flex, Box, Heading, useColorModeValue, Text, Button, Image, useMediaQuery } from '@chakra-ui/react';
import Logo from "../../assets/images/TaskTrakLogo.png";

export default function Onboarding() {
    const { isVisible, setIsVisible } = useContext(NavContext);
    const [currentPage, setCurrentPage] = useState(0);

    const [isDesktop] = useMediaQuery('(min-width: 900px)');

    useEffect(() => {
        setIsVisible(false);
    }, []);

    const pages = [
        (
            <Flex direction="column" justifyContent="center">
                <Image src={Logo} alt="TaskTrak Logo" w={200} mb="-45px" mt="-130px" />
                <Heading as="h3" size="lg" textAlign={isDesktop ? "left" : "center"}>Welcome to TaskTrak</Heading>
                <Text ml={1} mt={2} textAlign={isDesktop ? "left" : "center"}>Let's get you ready for limitless productivity.</Text>
                <Button 
                    justifySelf="flex-end"
                    alignSelf={isDesktop ? "flex-start" : "center"}
                    colorScheme="blue" 
                    variant="solid" 
                    size="sm"
                    mt={10}
                    mr={2}
                    mb={-20}
                    w="120px"
                    color={'white'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)'}}
                >Continue</Button>
            </Flex>
        )
    ]

    return (
        <Flex w="calc(100vw)" h="calc(100vh)" alignItems="center" justifyContent="center">
            <Box w="50%" h="50%" bg="gray.100" borderRadius={"3xl"} boxShadow="2xl" border={`1px solid ${useColorModeValue("gray.200", "gray.900")}`} overflow="hidden" pos="relative">
                <Box style={{ background: "radial-gradient(circle, rgba(44,100,207,0.37) 0%, rgba(237,242,247,1) 52%)" }} position="relative" top="-25px" right="-200px" h="120%" borderRadius={"3xl"} overflow="hidden">
                </Box>
                <Box pos="absolute" top="0" bottom="0" left="0" right="0" zIndex="20">
                    <Flex h="100%" alignItems="center" justifyContent="flex-start" px={30}>
                        {pages[currentPage]}
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}
