import { useState, useContext } from "react";
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Text
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ImStack } from "react-icons/im";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLogo from "../assets/images/HeaderLogo";
import config from "../config";
import { useAuth0 } from "@auth0/auth0-react";
import { NavContext } from "../contexts/NavConfig";

export default function Nav() {

    const navConfig = useContext(NavContext);

    const location = useLocation();
    const navigate = useNavigate();

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const navBg = useColorModeValue('gray.100', 'gray.900');
    const hoverBg = useColorModeValue("#E2E8F0", "rgba(255, 255, 255, 0.16)");

    if (!navConfig.isVisible) {
        return null;
    }

    return (
        <>
            <Box bg={navBg} px={4} boxShadow={"base"}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => navigate(isAuthenticated ? "/app" : "/")}>
                            <Flex alignItems={'center'} flexDirection={'row'}>
                                <Box style={{ color: "rgba(66, 153, 225, 1)" }} maxH="24px">
                                    <Box mt={-3}>
                                        <HeaderLogo height="50" width="125" />
                                    </Box>
                                </Box>
                            </Flex>
                        </Button>
                        {location.pathname !== "/" && (
                            <>
                                <Button onClick={() => navigate(config.routes.projectMgmt.root)} _hover={{ color: "rgba(66, 153, 225, 1)", bg: hoverBg }}>
                                    <Flex alignItems={'center'} flexDirection={'row'}>
                                        <Box padding={2} style={{ color: "rgba(66, 153, 225, 1)" }}>
                                            <ImStack size={20} />
                                        </Box>
                                        <Text fontWeight={600} fontSize={16} mr={3}>Project Management</Text>
                                    </Flex>
                                </Button>
                                <Button onClick={() => navigate(config.routes.reminders.root)} _hover={{ color: "rgba(66, 153, 225, 1)", bg: hoverBg }} rounded="md">
                                    <AiOutlineUnorderedList size={20} />
                                    <Text ml={"7px"}>Reminders</Text>
                                </Button>
                            </>
                        )}
                    </Stack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>

                            {isAuthenticated ? (
                                <>
                                    {
                                        location.pathname !== "/" ? (
                                            <Menu>
                                                <MenuButton
                                                    as={Button}
                                                    rounded={'full'}
                                                    variant={'link'}
                                                    cursor={'pointer'}
                                                    minW={0}
                                                    mr={5}
                                                >
                                                    <Avatar
                                                        size={'sm'}
                                                        src={user.picture}
                                                    />
                                                </MenuButton>
                                                <MenuList alignItems={'center'} boxShadow={"lg"}>
                                                    <br />
                                                    <Center>
                                                        <Avatar
                                                            size={'2xl'}
                                                            src={user.picture}
                                                        />
                                                    </Center>
                                                    <br />
                                                    <Center>
                                                        <strong><p>{user.given_name || user.email}</p></strong>
                                                    </Center>
                                                    {user.given_name && <Center><p>{user.email}</p></Center>}
                                                    <MenuDivider mt={4} />
                                                    <MenuItem onClick={() => navigate(config.routes.settings)}>Settings</MenuItem>
                                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        ) : (
                                            <Button variant="solid" colorScheme="blue" onClick={() => navigate("/app")}>Go to the App</Button>
                                        )
                                    }
                                </>
                            ) : (
                                <Button onClick={loginWithRedirect}>Login</Button>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}