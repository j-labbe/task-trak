import { useState, useEffect } from 'react';
import { Flex } from "@chakra-ui/react";
import "../styles.css";

const COLORS = {
    green: '#38A169',
    red: '#E53E3E',
    blue: '#3182CE',
    gray: '#CBD5E0'
};

export default function Status({ status, alternate, mt }) {

    const [currentStatus, setStatus] = useState(alternate ? status : status.toLowerCase());
    const [color, setColor] = useState(COLORS.blue);

    useEffect(() => {
        setStatus(alternate ? status : status.toLowerCase());
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
            case true:
                setColor(COLORS.green);
                break;
            case false:
                setColor(COLORS.red);
                break;
            default:
                setColor(COLORS.red);
        }
    }, [currentStatus]);


    return (
        <Flex direction="row" alignItems="center" mt={mt || 3} className="status-container" style={{ color }}>
            <div className="pulsing-circle"></div>
            <span>{alternate ? status ? "Completed" : "Incomplete" : status}</span>
        </Flex>
    )
}
