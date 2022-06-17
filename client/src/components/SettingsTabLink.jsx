import { Box, useColorModeValue } from '@chakra-ui/react';

// rgba(113, 123, 142, 1)

export default function SettingsTabLink({ isSelected, onClick, children }) {
    const lightSelected = useColorModeValue("black.900", "#FFF");
    const deselected = "rgba(113, 123, 142, 1)";
    const selectedHoverBg = isSelected ? "blue.100" : "blue.50";
    return (
        <Box
            bgColor={isSelected ? "#daeef9" : "transparent"}
            color={isSelected ? lightSelected : deselected}
            transition="100ms all cubic-bezier(0.4, 0, 1, 1)"
            fontWeight="bold"
            px={4}
            py={1}
            rounded="full"
            w={170}
            my={1}
            cursor="pointer"
            _hover={{ bg: selectedHoverBg }}
            onClick={onClick}
        >
            {children}
        </Box>
    )
}
