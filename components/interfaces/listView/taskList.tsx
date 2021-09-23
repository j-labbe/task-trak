import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { mixins } from "../../../styles";
import { useDragDropManager, useDrop } from 'react-dnd';
import { AppContext } from 'contexts/AppContext';
import { Tag, Task } from 'types';
import useRender from './utils/render';
import * as AppConfig from 'AppConfig';
import Spinner from '../../spinner';

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

    const {
        tasks, // List of Tasks
        appIsLoading, // Boolean - is the app loading
        setAppIsLoading, // Function (boolean) - change the state of app load
        refreshTasks, // Function () - refresh the tasks from airtable
        doneRefresh, // Boolean - is the refresh done?
        setRefreshStatus, // Function(boolean) - change the state of refresh
        getTasks
    } = useContext(AppContext);
    const { renderedItems, render, fetchNew, progressTask, regressTask } = useRender(listId);
    const [isLoaded, setIsLoaded] = useState(false);
    const manager = useDragDropManager();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "bar",
        drop: async (item: { id: string }, monitor) => {
            // TODO #21
            console.log(item.id);
            await modifyList(item.id);
            setRefreshStatus(true);
            await refreshTasks();
            setRefreshStatus(false);
            render();
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));
    let initialLoad = true;

    const modifyList = async (taskId: string): Promise<void> => {
        /**
         * TODO #21
         */
        const taskList = await getTasks();
        const tObj = taskList.find((t: Task) => t.id === taskId);
        
        if (!tObj) return Promise.reject("Task does not exist");
        if (tObj.progress < listId) {
            progressTask(tObj).then(() => render());
        } else if (tObj.progress > listId) {
            regressTask(tObj).then(() => render());
        } else render();
    };

    useEffect(() => {
        if (!doneRefresh) {
            // Will replace with AppConfig.listInterface.lists.at(-1) when there's more coverage
            // (waiting for safari compatibility)
            if (AppConfig.listInterface.lists[AppConfig.listInterface.lists.length - 1].index === listId) {
                if (!appIsLoading && initialLoad) {
                    setAppIsLoading(true);
                    refreshTasks();
                }
            }
        }else{
            render().then(() => setAppIsLoading(false));
        }
        initialLoad = false;
    }, [doneRefresh, appIsLoading]);


    return (
        <div {...style ? (style = { style }) : ''}>
            <StyledListGroup>
                <StyledList isOver={isOver}>
                    {
                        appIsLoading ? <Spinner /> : (
                            <>
                                <h3>{title}</h3>
                                <div id="list" className="style-list" ref={drop}>
                                    {renderedItems.map(r => r)}
                                </div>
                            </>
                        )
                    }
                </StyledList>
            </StyledListGroup>
        </div>
    );
};

export default TaskList;