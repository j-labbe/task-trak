import { Center, Box, Heading, Button, useColorMode, ScaleFade } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Status from "./Status";
import config from "../config";

export default function ProjectCard({ project, isPlaceholder }) {
    const { colorMode } = useColorMode();
    const isLight = colorMode === "light";
    const navigate = useNavigate();
    return (
        <Center m={5}>
            <ScaleFade initialScale={0.9} in whileHover={{ scale: 1.02 }}>
                <Box maxW="400px" minW="300px" bg={isLight ? "#EDF2F7" : "#171923"} border={`1px solid ${isLight ? `#EDF2F7` : `#2D3748`}`} rounded="lg" p={6} boxShadow={"base"}>
                    <Heading as="h3" fontSize={"2xl"} display="flex" justifyContent="space-between">
                        {project.name}
                        {!isPlaceholder && (
                            <Button
                                colorScheme="blue"
                                size="sm" ml={6}
                                onClick={() => navigate(`${config.routes.projectMgmt.project}/${project.id}`)}
                            >View</Button>
                        )}
                    </Heading>
                    <Status status={project.status} />
                </Box>
            </ScaleFade>
        </Center>
    );
}