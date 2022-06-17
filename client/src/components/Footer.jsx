import React from 'react';
import { Flex, Box, Text, Link, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box height={100} bg={useColorModeValue("gray.100", "#171923")} w="100%" mt={150}>
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center" direction="row">
            <Text>Built by <Link href="https://jacklabbe.com" target="_blank">Jack Labbe</Link> • <Link href="#" target="_blank">View Source</Link></Text>
        </Flex>
    </Box>
  )
}
