import { Flex, Box, useColorMode } from "@chakra-ui/react";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQueries";

export default function Projects({ view }) {

    const { colorMode } = useColorMode();
    const isLight = colorMode === "light";

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>

    return (
        <>
            {data.projects.length > 0 ? (
                <Box overflowX={"scroll"} maxW="80%" border={`1px solid ${isLight ? `#EDF2F7` : `#2D3748`}`} rounded="lg" boxShadow={"base"} py={2} px={10}>
                    <Flex direction="row" alignItems="center" justifyContent="" flexShrink={10} >
                        {data.projects.map(project => {
                            switch (view) {
                                case "Completed":
                                case "In Progress":
                                case "Not Started":
                                    if (project.status === view) {
                                        return <ProjectCard key={project.id} project={project} />
                                    }
                                    return undefined;
                                case "All":
                                    return <ProjectCard key={project.id} project={project} />
                                default: return undefined;
                            }
                        })}
                    </Flex>
                </Box>
            ) : (<p>No projects found</p>)}
        </>
    )
}