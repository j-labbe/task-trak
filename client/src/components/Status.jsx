import { useState, useEffect } from 'react';
import { Flex } from "@chakra-ui/react";
import "../styles.css";

const COLORS = {
    green: '#38A169',
    red: '#E53E3E',
    blue: '#3182CE',
    gray: '#CBD5E0'
};

export default function Status({ status }) {

    const [currentStatus, setStatus] = useState(status.toLowerCase());
    const [color, setColor] = useState(COLORS.blue);

    useEffect(() => {
        setStatus(status.toLowerCase());
    }, [status]);

    useEffect(() => {
        switch (currentStatus) {
            case "completed":
                setColor(COLORS.green);
                break;
            case "in progress":
                setColor(COLORS.blue);
                break;
            case "not started":
                setColor(COLORS.gray);
                break;
            default:
                setColor(COLORS.red);
        }
    }, [currentStatus]);


    return (
        <Flex direction="row" alignItems="center" mt={3} className="status-container" style={{ color }}>
            <div className="pulsing-circle"></div>
            <span>{status}</span>
        </Flex>
    )
}
