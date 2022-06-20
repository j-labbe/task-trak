import React from 'react';
import { Button } from '@chakra-ui/react';


export default function PageIndicator({ isActive, onClick }) {
    return (
        <Button
            onClick={onClick}
            borderRadius="full"
            bgColor={isActive ? "#fff" : "gray.300"}
            w="12px"
            h="6px"
            p={0}
            mr={2}
            cursor="pointer"
            style={{ 
                width: "12px !important", 
                padding: "0", 
                maxWidth: "12px !important", 
                minWith: "12px !important", 
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.05)" 
            }}
        />
    )
}