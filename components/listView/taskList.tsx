import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { mixins } from "../../styles";
import { useDragDropManager, useDrop } from 'react-dnd';
import { AppContext } from 'contexts/AppContext';
import { APIReturnedTask, APIReturnedTasks, Tag } from 'types';
import TaskBtn from 'components/listView/taskBtn';
import useRender from './utils/render';
import { TransitionGroup } from 'react-transition-group';

type StyledProps = {
    isOver: boolean
};

const StyledListGroup = styled.div`
    ${mixins.flexCenter}
    justify-content: flex-start;
    padding: 20px 0;
    flex-direction: column;
`;
const StyledList = styled.div<StyledProps>`
    ${mixins.flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 30px;
    width: 300px;
    background-color: var(--default-bg);
    border: ${props => props.isOver ? `2px dashed var(--primary-accent)` : `2px solid var(--card-border);`};
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
    .style-list {
        width: 100%;
        min-height: 50px;
    }
`;

const TaskList = ({ title, listId, style }: { title: string, listId: number, style?: object }) => {

    const { tasks, appIsLoading, setAppIsLoading } = useContext(AppContext);
    const { renderedItems, render, fetchNew, progressTask, regressTask } = useRender(listId);
    const [isLoaded, setIsLoaded] = useState(false);
    const manager = useDragDropManager();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "bar",
        drop: (item: { id: string }, monitor) => {
            modifyList(item.id);
            render();
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const modifyList = async (taskId: string): Promise<void> => {
        const tObj = tasks.find(t => t.id === taskId);
        if (!tObj) return Promise.reject("Task does not exist");
        if (tObj.progress < listId) {
            progressTask(tObj).then(() => render());
        } else if (tObj.progress > listId) {
            regressTask(tObj).then(() => render());
        } else render();
    };

    useEffect(() => {
        if (!isLoaded) {
            render().then(() => {
                setIsLoaded(true);
            });
        }
    }, [isLoaded]);


    return (
        <div {...style ? (style = { style }) : ''}>
            <StyledListGroup>
                <StyledList isOver={isOver}>
                    <h3>{title}</h3>
                    <div id="list" className="style-list" ref={drop}>
                        {renderedItems.map(r => r)}
                    </div>
                </StyledList>
            </StyledListGroup>
        </div>
    );
};

export default TaskList;