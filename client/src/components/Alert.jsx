import { Alert, AlertDescription, AlertTitle, AlertIcon } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function AlertComponent({ type, title, message, duration, onClose }) {

    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setTimeout(() => setIsVisible(true), 10);
        return () => {
            setIsVisible(false);
            setTimeout(() => setIsMounted(false), duration + 100);
        }
    }, []);

    const bgColor = type === "error" ? "red.100" : "green.100";
    const icon = type === "error" ? <AlertIcon /> : <FaCheckCircle />;

    return (
        <>
            {isMounted && (
                <Alert status={type} rounded="lg" bgColor={bgColor} opacity={isVisible ? "1" : "0"} transition={`${duration}ms all ease`} maxW="300px">
                    {icon}
                    <AlertTitle ml={2}>{title}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}
        </>
    )
}
