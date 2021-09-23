import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mixins } from "../../../styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppContext } from "contexts/AppContext";
import Router from 'next/router';
import nProgress from "nprogress";
import Head from "next/head";
import AlertBox, { ANIM } from '../../alertBox';
import TaskBtn from './taskBtn';
import TaskList from './taskList';
import { GroupType, Task, ArrayOfTasks } from 'types';
import TagInput from '../../TagInput';
import CreateTask from '../../CreateTask';
import * as API from 'utils/api';
import Loading from "components/loading";
import Spinner from 'components/spinner';
import * as AppConfig from 'AppConfig';

const StyledMyTasks = styled.div`
    position: absolute;
    top: 96px !important;
    left: 96px !important;
    right: 0 !important;
    bottom: 0 !important;
    width: calc(100% - 100px);
    overflow: auto;

    .container {
        padding-right: 25px;
        width: 100%;
        height: calc(100% - var(--nav-height));
        
        .sticky-title-container{
            position: fixed;
            z-index: 19;
            display: flex;
            flex-direction: row;
        }
        
        .sticky-title {
            position: fixed;
            height: 95px;
            width: 100%;
            margin: -20px 0 0 0;
            border-bottom: 2px solid var(--card-border);
            background-color: rgba(247, 247, 252, 0.8);
            z-index:20;

            @supports ((--webkit-backdrop-filter: none) or (backdrop-filter: none)){
                background-color: rgba(247, 247, 252, 0.5);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            }
        }
        .title {
            position: relative;
            z-index: 21;
            opacity: 2 !important;
            margin-top: 10px;
            padding-left: 30px;
        }
        .add-task {
            position: relative;
            z-index: 21;
            margin-top: 10px;
            padding-left: 30px;
            left: 30px;

            button{
                font-family: var(--font-default);
                border: none;
                background-color: var(--primary-accent);
                color: var(--cf-white);
                padding: 10px;
                border-radius: var(--border-radius);
                opacity: 1;
                transition: var(--transition);

                &:hover {
                    opacity: 0.8;
                    transition: var(--transition);
                    cursor: pointer;
                }
            }
        }
        .listgroup {
            ${mixins.flexCenter}
            flex-direction: column;
            padding-top: 85px;
            align-items: flex-start;
            height: 100%;
            @media (min-width: 1177px) {
                flex-direction: row;
            }
            @media(max-width: 1176px) {
                justify-content: flex-start;
                align-items: center;
                margin-top: 20px;
            }
        }
    }
`;

const ListView = () => {
    const { refreshTasks, userData, getUserData, createTask, appIsLoading, setAppIsLoading } = useContext(AppContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [sortedData, setSortedData] = useState(AppConfig.listInterface.lists);
    const [isCreateTask, setIsCreateTask] = useState(false);
    const [reloadState, handleReloadState] = useState(false);

    const showCreateTask = () => {
        setIsCreateTask(true);
    };
    const handleCreateTaskSuccess = async (res) => {
        await createTask(res);
        await refreshTasks();
        setIsCreateTask(false);
    }

    useEffect(() => {
        if (!isLoaded && !isMounted) {
            nProgress.start();
            getUserData().then(async () => {
                nProgress.set(0.5);
                setIsLoaded(true);
            });
        } else {
            if (isLoaded && !isMounted) {
                nProgress.done();
                setIsMounted(true);
            } else {
                nProgress.done();
            }
        }
    }, [isLoaded]);

    return (
        <div>
            <Head>
                <title>Home - Task Trak</title>
            </Head>
            <StyledMyTasks>
                {
                    isCreateTask ? (
                        <CreateTask
                            show={true}
                            onSuccess={handleCreateTaskSuccess}
                            onCancel={() => setIsCreateTask(false)}
                        />
                    ) : ''
                }
                <div className="container">
                    <div className="sticky-title-container">
                        <div className="sticky-title"></div>
                        {isMounted ? (
                            <TransitionGroup component={null}>
                                <CSSTransition classNames={"fastfadeup"} timeout={4000}>
                                    <h1 className="title">Welcome, {userData.firstName}</h1>
                                </CSSTransition>
                                <CSSTransition classNames="fastfadeup" timeout={2000}>
                                    <div className="add-task">
                                        <button onClick={() => showCreateTask()}>Add Task</button>
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        ) : ''}
                    </div>
                    {'' /* ADDING A SPINNER FOR TASK LISTS THAT ARE LOADING */}
                    <div className="listgroup">
                        <TransitionGroup component={null}>
                            {isMounted ?
                                sortedData.map((group, i) => (
                                    <CSSTransition key={i} classNames={"fastfadeup"} timeout={2000 + (i * 100)}>
                                        <TaskList title={group.title} listId={i} key={i} style={{ transitionDelay: `${i * 75}ms` }} />
                                    </CSSTransition>
                                ))
                                : ''}
                        </TransitionGroup>
                    </div>
                </div>
            </StyledMyTasks>
        </div>
    )
};

export default ListView;