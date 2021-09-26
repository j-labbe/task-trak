import React, { useEffect } from 'react';
import styled from "styled-components";
import mixins from "styles/mixins";
import { useDrop } from 'react-dnd';
import { Task } from 'types';
import useRender from './utils/render';
import * as AppConfig from 'AppConfig';
import Spinner from '../../spinner';
import { observer } from 'mobx-react-lite';
import { useContextState } from 'contexts/AppContext';

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

let initialLoad: boolean;

const TaskList = observer(({ title, listId, style, dropStatus }: { title: string, listId: number, style?: object, dropStatus?: boolean }) => {

    const {
        tasks, // List of Tasks
        appIsLoading, // Boolean - is the app loading
        setAppLoading, // Function (boolean) - change the state of app load
        refreshTasks, // Function () - refresh the tasks from airtable
        tasksRefreshing, // Boolean - is the refresh done?
        setRefreshStatus, // Function(boolean) - change the state of refresh
        getTasks,
    } = useContextState();
    const { renderedItems, render, progressTask, regressTask } = useRender(listId);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "bar",
        drop: async (item: { id: string }, monitor) => {
            setRefreshStatus(true);
            await modifyList(item.id);
            setRefreshStatus(false);
            render();
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }));
    initialLoad = true;

    const modifyList = async (taskId: string): Promise<void> => {
        const taskList = await getTasks();
        const tObj = taskList.find((t: Task) => t.id === taskId);
        if (!tObj) return Promise.reject("Task does not exist");
        if (tObj.progress < listId) {
            await progressTask(tObj);
            await render();
        } else if (tObj.progress > listId) {
            await regressTask(tObj);
            await render();
        } else render();
    };

    useEffect(() => {
        if (!appIsLoading && initialLoad) {
            setAppLoading(true);
            initialLoad = false;
        }
    }, [appIsLoading, setAppLoading]);

    useEffect(() => {
        if (appIsLoading) {
            if (AppConfig.listInterface.lists[AppConfig.listInterface.lists.length - 1].index === listId) {
                try {
                    refreshTasks().then(() => setAppLoading(false));
                } catch {
                    setAppLoading(false);
                }
            }
        }else{
            render();
        }
    }, [appIsLoading, listId, refreshTasks, render, setAppLoading]);

    useEffect(() => {
        setTimeout(() => render(),100);
    }, [dropStatus, tasks, render]);


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
});

export default TaskList;