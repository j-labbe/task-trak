import React, { useState, useContext, useEffect } from 'react';
import { NavContext } from '../../contexts/NavConfig';
import { Flex, Box, Heading, useColorModeValue, Text, Button, Image, useMediaQuery, Input, UnorderedList, ListeItem, ListIcon, ListItem } from '@chakra-ui/react';
import Logo from "../../assets/images/TaskTrakLogo.png";
import Pagination from '../../components/Pagination';
import Ideas from '../../assets/images/Ideas';
import Information from '../../assets/images/Information';
import FadeIn from 'react-fade-in';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { FiCheck } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import styled from '@emotion/styled';
import { useAuth0 } from '@auth0/auth0-react';

const ResetListStyle = styled.div`
    ul {
        list-style: none;
    }
    li {
        list-style: none;
    }
`

// LAST LEFT OFF - mobile styling 

export default function Onboarding() {
    const { loginWithRedirect } = useAuth0();
    const { isVisible, setIsVisible } = useContext(NavContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // password strength state
    const [meetsLength, setMeetsLength] = useState(0);
    const [hasNumber, setHasNumber] = useState(0);
    const [hasUpper, setHasUpper] = useState(0);
    const [hasLower, setHasLower] = useState(0);
    const [hasSpecial, setHasSpecial] = useState(0);
    const [disableSubmit, setDisableSubmit] = useState(true);

    // not exactly desktop, but styling looks good
    const [isSmall] = useMediaQuery('(max-width: 500px)');
    const [isDesktop] = useMediaQuery('(min-width: 768px)');
    const [breakPoint1] = useMediaQuery('(max-width: 1380px)');
    const [breakPoint2] = useMediaQuery('(max-width: 900px)');

    const validatePassword = (password) => {
        let validLen, validNum, validUpper, validLower, validSpecial;
        if (password.length >= 8) {
            setMeetsLength(1);
            validLen = true;
        } else {
            setMeetsLength(0);
            validLen = false;
        }
        if (password.match(/[a-z]/g)) {
            setHasLower(1);
            validLower = true;
        } else {
            setHasLower(0);
            validLower = false;
        }
        if (password.match(/[A-Z]/g)) {
            setHasUpper(1);
            validUpper = true;
        } else {
            setHasUpper(0);
            validUpper = false;
        }
        if (password.match(/[0-9]/g)) {
            setHasNumber(1);
            validNum = true;
        } else {
            setHasNumber(0);
            validNum = false;
        }
        if (password.match(/([!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g)) {
            setHasSpecial(1);
            validSpecial = true;
        } else {
            setHasSpecial(0);
            validSpecial = false;
        }
        if (validLen && validNum && validUpper && validLower && validSpecial) {
            setDisableSubmit(false);
            return true;
        } else {
            setDisableSubmit(true);
            return false;
        }
    }

    const handlePassword = (password) => {
        setPassword(password);
        validatePassword(password);
    }

    const createUser = async () => {
        try {
            const request = await axios.post("/api/users/createUser", { firstName, lastName, email, password });
            if (request.status === 200) {
                loginWithRedirect({
                    returnTo: window.location.origin
                })
            } else {
                console.log("Error creating user");
                // show error message
            }
        } catch (error) {
            console.log(error);
        }

    }

    const advancePage = ({ completed }) => {
        if (currentPage < pages.length - 1) {
            if (currentPage >= 3) {
                if (currentPage === 3) {
                    if (firstName === "") return;
                }
                if (currentPage === 4) {
                    if (lastName === "") return;
                }
                if (currentPage === 5) {
                    if (email === "") return;
                }
                if (currentPage === 6) {
                    if (password === "" || password.length < 4) return;
                }
            }
            if (completed) {
                setCurrentPage(currentPage + 1);
                createUser();
            } else {
                setCurrentPage(currentPage + 1);
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        setIsVisible(false);
        return () => {
            setIsVisible(true);
        }
    }, []);

    const pages = [
        (
            <FadeIn>
                <Flex direction="column" justifyContent="center" alignItems={breakPoint2 ? "center" : ""} w="100%" pl={3}>
                    <Image src={Logo} alt="TaskTrak Logo" w={200} mb="-45px" mt="-130px" />
                    <Heading as="h3" size="lg" textAlign={isDesktop ? "left" : "center"}>Welcome to TaskTrak</Heading>
                    <Text ml={1} mt={2} textAlign={isDesktop ? "left" : "center"}>Let's get you ready for limitless productivity.</Text>
                    <Button
                        onClick={advancePage}
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
                        _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                    >Continue</Button>
                </Flex>
            </FadeIn>
        ),
        (
            <FadeIn>
                <Flex direction={breakPoint2 ? "column-reverse" : "row"} justifyContent="center" alignItems="center" alignContent="center" w="100%" pl={3}>
                    <Flex direction="column" w={breakPoint2 ? "75%" : "50%"} justifyContent="center" alignItems="center" alignContent="center">
                        <Heading as="h3" size="lg" textAlign={isDesktop ? "left" : "center"}>What is TaskTrak?</Heading>
                        <Text mt={2} textAlign={isDesktop ? "left" : "center"}>TaskTrak is a tool that helps you stay on top of your to-do list and get the most out of your time.</Text>
                        <Button
                            onClick={advancePage}
                            justifySelf={breakPoint2 ? "center" : "flex-end"}
                            alignSelf={isDesktop ? "flex-start" : "center"}
                            colorScheme="blue"
                            variant="solid"
                            size="sm"
                            mt={10}
                            mr={breakPoint2 ? 0 : 2}
                            mb={-20}
                            w="120px"
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                        >Continue</Button>
                    </Flex>
                    <Flex w="50%">
                        <FadeIn>
                            <Box w="50%" ml={breakPoint2 ? "30px" : 20} pl={breakPoint2 ? 0 : 10} mb={breakPoint2 ? 10 : 0} mt={breakPoint2 ? -20 : 0}>
                                <Ideas scale={breakPoint2 ? 1.5 : 3} />
                            </Box>
                        </FadeIn>
                    </Flex>
                </Flex>
            </FadeIn>
        ),
        (
            <Box w="100%">
                <FadeIn>
                    <Flex direction="column" justifyContent="center" alignItems="center" w="100%" pl={3}>
                        <Information scale={1.7} />
                        <Heading as="h3" size="lg" textAlign={isDesktop ? "left" : "center"} mt={10}>We need a few things to get started.</Heading>
                        <Text ml={1} mt={2} textAlign={isDesktop ? "left" : "center"}>Please fill out the following information.</Text>
                        <Button
                            onClick={advancePage}
                            alignSelf="center"
                            colorScheme="blue"
                            variant="solid"
                            size="sm"
                            mt={6}
                            mb={-20}
                            w="120px"
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                        >Continue</Button>
                    </Flex>
                </FadeIn>
            </Box>
        ),
        (
            <FadeIn>
                <Flex direction="column" w="100%" pl={isDesktop ? 3 : 0}>
                    <Flex direction="column" justifyContent="center"  pl={isDesktop ? 3 : 0}>
                        <Heading as="h3" size="lg" mb={4} mt={isDesktop ? -20 : 0} textAlign={isDesktop ? "left" : "center"}>What is your first name?</Heading>
                        <label style={{ paddingLeft: "2px" }}><strong>First Name</strong></label>
                        <Input placeholder="John" mb={3} onChange={(e) => setFirstName(e.target.value)} value={firstName} required />
                        <Button
                            onClick={advancePage}
                            justifySelf={isDesktop ? "flex-end" : "center"}
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
                            _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                        >Continue</Button>
                    </Flex>
                </Flex>
            </FadeIn>
        ),
        (
            <FadeIn>
                <Flex direction="column" w="100%" pl={3}>
                    <Flex direction="column" justifyContent="center" pl={isDesktop ? 3 : 0}>
                        <Heading as="h3" size="lg" mb={4} mt={isDesktop ? -20 : 0} textAlign={isDesktop ? "left" : "center"}>Hey, {firstName}! What's your last name?</Heading>
                        <label style={{ paddingLeft: "2px" }}><strong>Last Name</strong></label>
                        <Input placeholder="Doe" mb={3} onChange={(e) => setLastName(e.target.value)} value={lastName} required />
                        <Button
                            onClick={advancePage}
                            justifySelf={isDesktop ? "flex-end" : "center"}
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
                            _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                        >Continue</Button>
                    </Flex>
                </Flex>
            </FadeIn>
        ),
        (
            <FadeIn>
                <Flex direction="column" w="100%" pl={3}>
                    <Flex direction="column" justifyContent="center" pl={isDesktop ? 3 : 0}>

                        <Heading as="h3" size="lg" mb={4} mt={-5} textAlign={isDesktop ? "left" : "center"}>What's your email, {firstName}?</Heading>
                        <label style={{ paddingLeft: "2px" }}><strong>Email</strong></label>
                        <small>You will be asked to verify your email.</small>
                        <Input placeholder="john.doe@example.com" mb={3} onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <Button
                            onClick={advancePage}
                            justifySelf={isDesktop ? "flex-end" : "center"}
                            alignSelf={isDesktop ? "flex-start" : "center"}
                            colorScheme="blue"
                            variant="solid"
                            size="sm"
                            mt={10}
                            mr={2}
                            mb={-10}
                            w="120px"
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                        >Continue</Button>
                    </Flex>
                </Flex>
            </FadeIn>
        ),
        (
            <FadeIn>
                <Flex direction={isDesktop ? "row" : "column"} w="100%" pl={3}>
                    <Flex direction="column" justifyContent="center" pl={isDesktop ? 3 : 0}>

                        <Heading as="h3" size="lg" mb={4} mt={-5} textAlign={isDesktop ? "left" : "center"}>Choose a password</Heading>
                        <label style={{ paddingLeft: "2px" }}><strong>Password</strong></label>
                        <Input placeholder="Password" mb={1} type="password" onChange={(e) => handlePassword(e.target.value)} value={password} required />
                        <Button
                            onClick={() => advancePage({ completed: true })}
                            justifySelf={isDesktop ? "flex-end" : "center"}
                            alignSelf={isDesktop ? "flex-start" : "center"}
                            colorScheme="blue"
                            variant="solid"
                            size="sm"
                            mt={10}
                            mr={2}
                            mb={-10}
                            w="120px"
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{ bg: 'blue.600', boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)' }}
                            disabled={disableSubmit}
                        >Continue</Button>
                    </Flex>
                    <Flex direction="column" w={isDesktop ? "50%" : "100%"} justifyContent="center" alignItems="center" alignContent="center" mt={isDesktop ? 0 : 20}>
                        <small>
                            Your password must contain:
                            <ResetListStyle>
                                <UnorderedList>
                                    <ListItem>
                                        {meetsLength ? <ListIcon as={FiCheck} color="green.500" /> : <ListIcon as={MdClose} color="red.500" />}
                                        At least 8 characters
                                    </ListItem>
                                    <ListItem>
                                        All of the following:
                                        <UnorderedList>
                                            <ListItem>
                                                {hasLower ? <ListIcon as={FiCheck} color="green.500" /> : <ListIcon as={MdClose} color="red.500" />}
                                                Lower case letters (a-z)
                                            </ListItem>
                                            <ListItem>
                                                {hasUpper ? <ListIcon as={FiCheck} color="green.500" /> : <ListIcon as={MdClose} color="red.500" />}
                                                Upper case letters (A-Z)
                                            </ListItem>
                                            <ListItem>
                                                {hasNumber ? <ListIcon as={FiCheck} color="green.500" /> : <ListIcon as={MdClose} color="red.500" />}
                                                Numbers (0-9)
                                            </ListItem>
                                            <ListItem>
                                                {hasSpecial ? <ListIcon as={FiCheck} color="green.500" /> : <ListIcon as={MdClose} color="red.500" />}
                                                Special characters (e.g. !@#$%^&*)
                                            </ListItem>
                                        </UnorderedList>
                                    </ListItem>
                                </UnorderedList>
                            </ResetListStyle>
                        </small>
                    </Flex>
                </Flex>
            </FadeIn>
        ),
        (
            <Flex direction="column" w="100%">
                <FadeIn>
                    <Flex direction="column" justifyContent="center" w="100%" alignItems="center">
                        <Heading textAlign="center" mb={5} size="lg">Creating your account...</Heading>
                        <Spinner />
                        <Text mt={5}>You'll be redirected to log in when we're finished.</Text>
                    </Flex>
                </FadeIn>
            </Flex>

        )
    ];

    const grayBorder = useColorModeValue("gray.200", "gray.900");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Flex w="calc(100vw)" h="calc(100vh)" alignItems="center" justifyContent="center">
            {isMounted ? (
                <Box w={breakPoint2 ? "75%" : "50%"} h={breakPoint2 ? "75%" : "50%"} bg="gray.100" borderRadius={"3xl"} boxShadow="2xl" border={`1px solid ${grayBorder}`} maxW="720px" overflow="hidden" pos="relative">
                    {!isSmall && (
                        <Box style={{ background: "radial-gradient(circle, rgba(44,100,207,0.37) 0%, rgba(237,242,247,1) 52%)" }} position="relative" top="-25px" right="-200px" h="120%" borderRadius={"3xl"} overflow="hidden"></Box>
                    )}
                    <Box pos="absolute" top="0" bottom="0" left="0" right="0" zIndex="20">
                        <Flex h="100%" alignItems="center" justifyContent={breakPoint2 ? "center" : "flex-start"} px={30}>
                            {pages[currentPage]}
                        </Flex>
                        {/* <Box id="pagination" zIndex={20} mt={-6}>
                            <Flex justifyContent="center" alignItems="center" w="100%" h="100%" direction="row">
                                <Pagination currentPage={currentPage} totalPages={pages.length} setCurrentPage={setCurrentPage} />
                            </Flex>
                        </Box> */}
                    </Box>
                </Box>
            ) : (
                <Spinner />
            )}
        </Flex>
    )
}
