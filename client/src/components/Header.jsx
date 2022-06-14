import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function Nav() {

    const [showDetails, setShowDetails] = useState(false);

    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const toggleAdditionalMenuText = () => setShowDetails(!showDetails);

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow={"base"}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction="row" spacing={4}>
                        <Button onClick={() => navigate("/")}>
                            <Flex alignItems={'center'} flexDirection={'row'}>
                                <Box padding={2} style={{ color: "rgba(66, 153, 225, 1)" }}>
                                    <ImStack size={20} />
                                </Box>
                                <Text fontWeight={600} fontSize={16} mr={3}>Project Management</Text>
                            </Flex>
                        </Button>
                        <Button _hover={{ color: "rgba(66, 153, 225, 1)", bg: "#E2E8F0" }} rounded="md" onMouseEnter={toggleAdditionalMenuText} onMouseLeave={toggleAdditionalMenuText}>
                            <AiOutlineUnorderedList size={20} />
                            <Text style={{ opacity: showDetails ? `1` : `0`, transition: "ease-in", transitionDuration: "200ms", transitionProperty: "opacity" }} ml={"7px"}>Reminders</Text>
                        </Button>
                    </Stack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <FaMoon /> : <FaSun />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Your Servers</MenuItem>
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}