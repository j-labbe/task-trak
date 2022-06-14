import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} pt={10}>
            <FaExclamationTriangle color="#E53E3E" size={100} />
            <Heading p={5} fontSize="52px">404</Heading>
            <Text>Sorry, this page does not exist.</Text>
            <Button colorScheme={"blue"} mt={10}>
                <Link to={"/"}>Go Home</Link>
            </Button>
        </Flex>
    )
}
