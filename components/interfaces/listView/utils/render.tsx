import { useContext, useState } from 'react';
import { Task } from 'types';
import { AppContext } from 'contexts/AppContext';
import TaskBtn from '../taskBtn';
import nProgress from 'nprogress';
import { observer } from 'mobx-react-lite';
import { useContextState } from 'contexts/AppContext';

const useRender = (listId: number) => {
    const [renderedItems, setRenderedItems] = useState([]);
    const { getTasks, refreshTasks, updateTask, deleteTask } = useContextState();
    const render = async (): Promise<void> => {
        try {
            nProgress.start();
            let list = [];
            nProgress.set(50);
            const tasks = getTasks();
            tasks.forEach((t: Task) => {
                if (t.progress !== listId) return;
                list.push(
                    <TaskBtn
                        key={t.id}
                        title={t.name}
                        taskId={t.id}
                        description={t.description}
                        tags={t.properties.tags}
                    />
                );
            });
            setRenderedItems(list);
            nProgress.done();
            return Promise.resolve();
        } catch (e) {
            return Promise.reject("Error");
        }
    };
    const fetchNew = async (): Promise<void> => {
        await refreshTasks().then(() => render());
        return Promise.resolve();
    };
    /**
     * @param taskId Unique TaskID
     * @returns void
     */
    const removeTask = async (taskId: string): Promise<void> => {
        try{
            await deleteTask({taskId: taskId});
            await render();
            Promise.resolve();
        }catch{
            Promise.reject();
        }
    };
    const progressTask = async (obj: Task): Promise<void> => {
        obj.progress = listId;
        try {
            await updateTask(obj);
            await render();
            Promise.resolve();
        } catch (e) {
            console.error(e);
            return Promise.reject('Could not update task');
        }
    };
    const regressTask = async (obj: Task): Promise<void> => {
        obj.progress = listId;
        try {
            await updateTask(obj);
            await render();
            Promise.resolve();
        } catch (e) {
            console.error(e);
            return Promise.reject('Could not update task');
        }
    };
    return { renderedItems, render, fetchNew, progressTask, regressTask, removeTask };
};

export default useRender;