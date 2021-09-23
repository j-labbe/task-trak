import { useContext, useState } from 'react';
import { Task } from '../../../../types';
import { AppContext } from '../../../../contexts/AppContext';
import TaskBtn from '../taskBtn';
import nProgress from 'nprogress';

const useRender = (listId: number) => {
    const [renderedItems, setRenderedItems] = useState([]);
    const { tasks, refreshTasks, updateTask } = useContext(AppContext);
    /**
     * TODO #19
     */
    const render = async (): Promise<void> => {
        try {
            nProgress.start();
            let list = [];
            nProgress.set(50);
            tasks.forEach((t) => {
                if (t.progress !== listId) return;
                list.push(
                    <TaskBtn
                        key={t.id}
                        title={t.name}
                        taskId={t.id}
                        tags={t.properties.tags}
                    />
                );
            });
            setRenderedItems(list);
            nProgress.done();
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };
    const fetchNew = async (): Promise<void> => {
        await refreshTasks().then(() => render());
        return Promise.resolve();
    };
    /**
     * Remove a task from the rendered list.
     * Re-renders on completion.
     * Does NOT remove from database or context list of tasks.
     * @param taskId Unique TaskID
     * @returns void
     */
    const removeTask = async (taskId: string): Promise<void> => {
        if (renderedItems.length === 0) return Promise.reject('No items are rendered');
        console.log(renderedItems);
        const newRenderedItems = renderedItems.filter((t: Task) => t.id !== taskId);
        console.log(newRenderedItems);
        setRenderedItems(newRenderedItems);
        render();
        return Promise.resolve();
    };
    const progressTask = async (obj: Task): Promise<void> => {
        obj.progress = listId;
        try {
            await updateTask(obj).then(() => removeTask(obj.id).then(() => render()));
        } catch (e) {
            console.error(e);
            return Promise.reject('Could not update task');
        }
        return Promise.resolve();
    };
    const regressTask = async (obj: Task): Promise<void> => {
        obj.progress = listId;
        try {
            await updateTask(obj).then(() => removeTask(obj.id).then(() => render()));
        } catch (e) {
            console.error(e);
            return Promise.reject('Could not update task');
        }
        return Promise.resolve();
    };
    return { renderedItems, render, fetchNew, progressTask, regressTask, removeTask };
};

export default useRender;