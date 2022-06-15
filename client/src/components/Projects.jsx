import React, { useState } from 'react';
import { Select, Flex, Box, Heading } from '@chakra-ui/react';
import ProjectList from '../components/ProjectsList';


export default function Projects() {
    const [view, setView] = useState("All"); // In Progress, Completed, Not Started, All
    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" p={4} w={"80%"}>
                <Heading mb={0}>Projects - {view}</Heading>
                <Box w="175px">
                    <Select onChange={(e) => setView(e.target.value)} value={view}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="All">All</option>
                    </Select>
                </Box>
            </Flex>
            <ProjectList view={view} />
        </>
    )
}
