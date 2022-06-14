import { Flex, useColorMode } from '@chakra-ui/react';
import { SpinnerCircularFixed } from "spinners-react";

export default function Spinner() {
    const { colorMode } = useColorMode();
    const isLight = colorMode === 'light';
    return (
        <Flex justifyContent={'center'} alignItems={'center'}>
            <SpinnerCircularFixed size={50} thickness={100} speed={100} color="rgba(66, 153, 225, 1)" secondaryColor={isLight ? "#E2E8F0" : "rgba(23, 25, 35, 1)"} />
        </Flex>
    );
}