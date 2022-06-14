import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Flex,
    Text
} from '@chakra-ui/react';
import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmActionModal({ actionBtn, actionText, onConfirm }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleConfirm = () => {
        onClose();
        onConfirm();
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme={actionBtn.colorScheme} variant={actionBtn.variant} size={actionBtn.size}>{actionBtn.text}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex colorScheme="yellow" alignItems="center" justifyContent="center" mb={5}>
                            <FaExclamationTriangle size={70} style={{color: "#ECC94B"}} />
                        </Flex>
                        <Text>{actionText}</Text>
                    </ModalBody>
                    <ModalFooter justifyContent="center" alignItems="center">
                        <Button variant="outline" colorScheme={"yellow"} onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme={"yellow"} mr={3} onClick={handleConfirm}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}