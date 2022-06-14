import { Heading, List, ListItem, ListIcon, Text, Flex, useColorMode } from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }) {
    const { colorMode } = useColorMode();
    const isLight = colorMode === "light";
    return (
        <Flex direction="column" border={`1px solid ${isLight ? `#EDF2F7` : `#2D3748`}`} rounded="lg" pl={10} pr={10} pt={5} pb={5} mt={5} boxShadow={"base"}>
            <Heading mb={5}>Client Information</Heading>
            <List spacing={3}>
                <ListItem>
                    <Flex direction="row" alignItems="center">
                        <ListIcon as={FaIdBadge} />
                        <Text>{client?.name}</Text>
                    </Flex>
                </ListItem>
                <ListItem>
                    <Flex direction="row" alignItems="center">
                        <ListIcon as={FaEnvelope} />
                        <Text>{client?.email}</Text>
                    </Flex>
                </ListItem>
                <ListItem>
                    <Flex direction="row" alignItems="center">
                        <ListIcon as={FaPhone} />
                        <Text>{client?.phone}</Text>
                    </Flex>
                </ListItem>
            </List>
        </Flex>
    )
}
