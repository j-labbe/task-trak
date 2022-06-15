import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NavigationCard({ icon, title, description, link }) {
    const navigate = useNavigate();
    return (
        <Center py={6} mx={10}>
            <Box
                maxW={'320px'}
                minW={'320px'}
                minH={"302px"}
                maxH={"302px"}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                transition="100ms all cubic-bezier(0.4, 0, 1, 1)"
                _hover={{
                    boxShadow: 'xl',
                }}
                border={`1px solid ${useColorModeValue(`#EDF2F7`, `#2D3748`)}`}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Flex alignItems="center" justifyContent="center" my={8}>
                    {icon}
                </Flex>
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {title}
                </Heading>
                <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2}>{description}</Text>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        onClick={() => navigate(link)}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                            boxShadow: '0px 1px 10px -2.5px rgb(66 153 225 / 48%), 0 8px 8px -6px rgb(66 153 225 / 43%)'
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        Take me there
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}