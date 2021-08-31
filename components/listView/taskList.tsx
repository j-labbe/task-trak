import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { mixins } from "../../styles";
import {HTML5toTouch} from 'rdndmb-html5-to-touch';
import {DndProvider} from 'react-dnd-multi-backend';

const StyledListGroup = styled.div`
    ${mixins.flexCenter}
    justify-content: flex-start;
    padding: 20px 0;
    flex-direction: column;
`;
const StyledList = styled.div`
    ${mixins.flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 30px;
    width: 300px;
    background-color: var(--default-bg);
    border: 2px solid var(--card-border);
    border-radius: var(--border-radius);
    height: auto;
    padding-bottom: 20px;

    @media(max-width: 1176px){
        margin: 0 20px;
        width: 500px;
    }
    @media(max-width: 916px){
        margin: 0 10px;
    }
    @media(max-width: 768px) {
        margin: 10px 0;
        width: 300px;
    }
`;

type Props = {
    title: string,
    children: React.ReactNode,
    style?: object
}

const TaskList = ({ title, children, style }: Props) => {
    return (
        <div {...style ? (style = { style }) : ''}>
            <StyledListGroup>
                <StyledList>
                    <h3>{title}</h3>
                    <DndProvider options={HTML5toTouch}>
                        {children}
                    </DndProvider>
                </StyledList>
            </StyledListGroup>
        </div>
    );
};

export default TaskList;