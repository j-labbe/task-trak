import React, { useState } from 'react';
import { Select, Box, Heading } from '@chakra-ui/react';
import ProjectList from '../components/ProjectsList';


export default function Projects() {
    const [view, setView] = useState("All"); // In Progress, Completed, Not Started, All
    return (
        <>
            <Heading mb={3}>Projects - {view}</Heading>
            <Box w="175px">
                <Select onChange={(e) => setView(e.target.value)} value={view}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="All">All</option>
                </Select>
            </Box>
            <ProjectList view={view} />
        </>
    )
}
