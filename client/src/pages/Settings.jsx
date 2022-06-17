import { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    ListItem,
    UnorderedList,
    useColorModeValue,
    Input,
    Text,
    Button,
    Avatar,
    Switch
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import SettingsTabLink from '../components/SettingsTabLink';
import Spinner from '../components/Spinner';
import FadeIn from "react-fade-in";
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import axios from "axios";
import Alert from '../components/Alert';
import { mixed } from 'yup';

const settingsTabs = [
    {
        name: "Account",
        accessor: "account"
    },
    {
        name: "Notifications",
        accessor: "notifications"
    },
    {
        name: "Data Export",
        accessor: "dataExport"
    }
];

const getTabName = (accessor) => settingsTabs.find(tab => tab.accessor === accessor).name;

function Settings() {

    const { isAuthenticated, user } = useAuth0();

    const [selectedTab, setSelectedTab] = useState(settingsTabs[0].accessor);
    const [isSaving, setIsSaving] = useState(false);
    const [mountSpinner, setMountSpinner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState("error");
    const [email, setEmail] = useState(user.email);
    const [givenName, setGivenName] = useState(user.given_name);
    const [familyName, setFamilyName] = useState(user.family_name);

    const borderColor = useColorModeValue(`#CBD5E0`, `#2D3748`);
    const fadeBg = useColorModeValue("#F7FAFC", "#171923")

    const showSpinner = () => {
        setMountSpinner(true);
        setTimeout(() => setIsSaving(true), 10);
    }
    const hideSpinner = () => {
        setIsSaving(false);
        setTimeout(() => {
            setMountSpinner(false);
        }, 300);
    }
    const popupAlert = (type, msg) => {
        setAlertType(type);
        setAlertMsg(msg);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    }

    const convertToBase64 = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
        });
    }

    const uploadAvatar = async (event) => {
        const file = event.target.files[0];
        const type = file.type;
        const supportedFormats = ["jpg", "jpeg", "png"];
        
        // check if the file type is supported
        if (!supportedFormats.includes(type.split("/")[1])) {
            return popupAlert("error", "File type is not supported");
        }

        const data = await convertToBase64(file);
        const request = await axios.post("/api/users/uploadAvatar", {
            id: user.sub,
            base64Image: data,
            imageName: `${user.sub}-${Date.now()}-${file.name.replace(/\s/g, `-`)}`,
            type
        });

        if (request.status === 200) {
            popupAlert("success", "Avatar uploaded successfully! Loading changes...");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            popupAlert("error", "Error uploading avatar!");
        }
    }

    const updateEmail = async (id, email) => {
        try {
            const req = await axios.post(`/api/users/updateEmail`, { id, email });
            if (req.data.message === "Succcess") {
                return { result: true, message: "Email updated" };
            } else {
                hideSpinner();
                return { result: false, message: "Error updating email" };
            }
        } catch (err) {
            hideSpinner();
            return { result: false, message: "Error updating email" };
        }
    }

    const updateName = async (id, givenName, familyName) => {
        try {
            const req = await axios.post(`/api/users/updateName`, { id, given_name: givenName, family_name: familyName });
            if (req.data.message === "Success") {
                return { result: true, message: "Name updated" };
            } else {
                hideSpinner();
                return { result: false, message: "Error updating name" };
            }
        } catch (err) {
            hideSpinner();
            return { result: false, message: "Error updating name" };
        }
    }

    const handleSaveChanges = async () => {
        showSpinner();
        if (selectedTab === "account") {
            // detect any field changes. if none, return
            if (givenName !== user.given_name || familyName !== user.family_name) {
                const nameUpdate = await updateName(user.sub, givenName, familyName);
                if (!nameUpdate.result) {
                    return popupAlert("error", nameUpdate.message);
                }
            }
            if (email !== user.email) {
                const emailUpdate = await updateEmail(user.sub, email);
                if (!emailUpdate.result) {
                    return popupAlert("error", emailUpdate.message);
                }
            }
            popupAlert("success", "Changes saved");
        }
        hideSpinner();
    }

    return (
        <Seo title="Settings" extraStyle={{ height: "100%" }}>
            <Flex alignItems="center" justifyContent="center" position="relative">
                {showAlert && (
                    <Alert type={alertType} duration={400} title={alertType.charAt(0).toLocaleUpperCase().concat(alertType.slice(1, alertType.length))} message={alertMsg} />
                )}
            </Flex>
            <Flex w={"100%"} alignContent={"center"} justifyContent="center" direction="row" mt={10}>
                <Flex maxW="300px" direction="column">
                    <Heading fontSize={32} fontWeight={800} mb={5}>Settings</Heading>
                    {settingsTabs.map((tab) => (
                        <SettingsTabLink key={tab.accessor} isSelected={selectedTab === tab.accessor} onClick={() => setSelectedTab(tab.accessor)}>{tab.name}</SettingsTabLink>
                    ))}
                </Flex>
                <Box
                    pos="relative"
                    bg={useColorModeValue("#F7FAFC", "#171923")}
                    rounded={"2xl"}
                    border={`1px solid ${useColorModeValue("#EDF2F7", "#171923")}`}
                    boxShadow="lg"
                    w="560px"
                    m={15}
                    overflow="hidden"
                    transition="100ms all cubic-bezier(0.4, 0, 1, 1)"
                >
                    {mountSpinner && (
                        <Flex position="absolute" zIndex={1} top={0} left={0} bottom={0} right={0} bg={fadeBg} p={0} m={0} w="100%" h="100%" alignItems="center" transition="300ms all ease" opacity={isSaving ? "1" : "0"} justifyContent="center">
                            <Spinner />
                        </Flex>
                    )}
                    <Box pb={8} px={50}>

                        <Flex direction="column" mt={5}>
                            {selectedTab === "account" && (
                                <FadeIn>
                                    <Heading fontSize={28} fontWeight="bold" my={5} p={0}>{getTabName(selectedTab)}</Heading>
                                    <Flex direction="row" justifyContent="flex-start" alignItems="center" my={5}>
                                        <Flex direction="column" justifyContent="center" alignItems="center" w="20%">
                                            <label style={{ marginLeft: "3px", fontWeight: "600", fontSize: "16px" }}>Avatar</label>
                                            <Avatar size="md" name={user.name} src={user.picture} mb={7} mt={1} />
                                        </Flex>
                                        <Flex dir="row">
                                            <input id="avatarUpload" type="file" accept="image/*" onChange={uploadAvatar} hidden formEncType="multipart/formdata" />
                                            <Button variant="ghost" colorScheme="blue" size="sm" ml={0} onClick={() => document.getElementById("avatarUpload").click()}>Upload</Button>
                                        </Flex>
                                    </Flex>
                                    <Flex direction="row" alignItems="center" justifyContent="space-between" mb={5} w="100%" borderTop={`1px solid ${borderColor}`} py={5}>
                                        <Flex direction="column" mx={2}>
                                            <label style={{ marginLeft: "3px", fontWeight: "600", fontSize: "12px" }}>First Name</label>
                                            <Input autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder={givenName} value={givenName} onChange={(e) => setGivenName(e.target.value)} />
                                        </Flex>
                                        <Flex direction="column" mx={2}>
                                            <label style={{ marginLeft: "3px", fontWeight: "600", fontSize: "12px" }}>Last Name</label>
                                            <Input autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder={familyName} value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
                                        </Flex>
                                    </Flex>
                                    <Flex direction="row" alignItems="center" justifyContent="space-between" mb={5} w="100%" borderTop={`1px solid ${borderColor}`} py={5}>
                                        <Flex direction="column" mx={2}>
                                            <label style={{ marginLeft: "3px", fontWeight: "600", fontSize: "12px" }}>Email</label>
                                            <Input autoCapitalize="off" autoComplete="off" autoCorrect="off" type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Flex>
                                    </Flex>
                                    <Flex direction="row" alignItems="center" justifyContent="space-between" mb={5} w="100%" borderTop={`1px solid ${borderColor}`} borderBottom={`1px solid ${borderColor}`} py={5}>
                                        <Flex direction="column" mx={2}>
                                            <Heading fontSize={14} fontWeight="bold">Delete account</Heading>
                                            <Text fontSize="13px">By deleting your account you will lose all your data</Text>
                                        </Flex>
                                        <Button colorScheme="red" variant="ghost" size="sm" ml={2}>Delete</Button>
                                    </Flex>
                                    <Flex direction="row" justifyContent="flex-end" w="100%">
                                        <Button colorScheme="blue" variant="solid" size="sm" mr={2}
                                            color={'white'}
                                            boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            }
                                            _hover={{
                                                bg: 'blue.600',
                                                boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)'
                                            }}
                                            onClick={handleSaveChanges}
                                        >Save Changes</Button>
                                    </Flex>
                                </FadeIn>
                            )}
                            {selectedTab === "notifications" && (
                                <FadeIn>
                                    <Heading fontSize={28} fontWeight="bold" my={5} p={0}>{getTabName(selectedTab)}</Heading>
                                    <Flex direction="row" alignItems="center" justifyContent="space-between" mb={5} w="100%" borderTop={`1px solid ${borderColor}`} borderBottom={`1px solid ${borderColor}`} py={5}>
                                        <Flex direction="column" mx={2} justifyContent="center">
                                            <label style={{ fontWeight: "600", fontSize: "14px" }}>Smart Notifications</label>
                                            <Text fontSize={12}>Receive notifications about your projects and reminders.</Text>
                                        </Flex>
                                        <Box px={2}>
                                            <Switch id="smart" size="md" isChecked={true} />
                                        </Box>
                                    </Flex>
                                    <Flex direction="row" justifyContent="flex-end" w="100%">
                                        <Button colorScheme="blue" variant="solid" size="sm" mr={2}
                                            color={'white'}
                                            boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            }
                                            _hover={{
                                                bg: 'blue.600',
                                                boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)'
                                            }}>Save Changes</Button>
                                    </Flex>
                                </FadeIn>
                            )}
                            {selectedTab === "dataExport" && (
                                <FadeIn>
                                    <Heading fontSize={28} fontWeight="bold" my={5} p={0}>{getTabName(selectedTab)}</Heading>
                                    <Text fontSize={16}>Where should we send your data?</Text>
                                    <Flex direction="row" alignItems="center" justifyContent="space-between" mb={5} w="100%" py={5} borderBottom={`1px solid ${borderColor}`}>
                                        <Flex direction="column" mx={2}>
                                            <label style={{ marginLeft: "3px", fontWeight: "600", fontSize: "12px" }}>Email</label>
                                            <Input autoCapitalize="off" autoComplete="off" autoCorrect="off" type="email" placeholder={user.email} value={user.email} />
                                        </Flex>
                                    </Flex>
                                    <Flex direction="row" justifyContent="space-between" alignItems="center" w="100%">
                                        <Text fontSize={12} align="right">You should receive an email within 24 hours.</Text>
                                        <Button colorScheme="blue" variant="solid" size="sm" mr={2}
                                            color={'white'}
                                            boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            }
                                            _hover={{
                                                bg: 'blue.600',
                                                boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)'
                                            }}>Send Data</Button>
                                    </Flex>
                                </FadeIn>
                            )}
                        </Flex>
                    </Box>

                </Box>
            </Flex>
            <Footer />
        </Seo>
    )
}

export default withAuthenticationRequired(Settings, {
    onRedirecting: () => <Spinner />,
    redirectTo: '/app'
});