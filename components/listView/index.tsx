import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mixins } from "../../styles";
import { settings } from "../../demo";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppContext, IndividualTaskTypes, TaskTypes, UserDataTypes } from "../../contexts/AppContext";
import Router from 'next/router';
import nProgress from "nprogress";
import Head from "next/head";
import AlertBox, { ANIM } from '../alertBox';
import TaskBtn from './taskBtn';
import TaskList from './taskList';

type GroupType = Array<{
    title: string,
    children: TaskTypes
}>;

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
        
        .sticky-title {
            position: fixed;
            height: 95px;
            width: 100%;
            margin: -20px 0 0 0;
            border-bottom: 2px solid var(--card-border);
            background-color: rgba(247, 247, 252, 0.8);

            @supports ((--webkit-backdrop-filter: none) or (backdrop-filter: none)){
                background-color: rgba(247, 247, 252, 0.5);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            }
        }
        .title {
            position: fixed;
            z-index: 2;
            opacity: 2 !important;
            margin-top: 10px;
            padding-left: 30px;
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
        }
    }
`;

const ListView = () => {
    const { tasks, refreshTasks, userData, getUserData } = useContext(AppContext);
    const [isMounted, setIsMounted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    let groups: GroupType = [];
    groups[0] = { title: "Not Started", children: [] };
    groups[1] = { title: "In Progress", children: [] };
    groups[2] = { title: "Completed", children: [] };

    const refreshAndSort = async () => {
        const data: TaskTypes = await refreshTasks();
        data.map((task: IndividualTaskTypes) => {
            if (task.progress === 0) {
                groups[0].children.push(task);
            } else if (task.progress === 1) {
                groups[1].children.push(task);
            } else {
                groups[2].children.push(task);
            }
        });
        setSortedData(groups);
        console.log(groups);
        return true;
    };

    useEffect(() => {
        nProgress.start();
        const init = async () => {
            const taskData = await refreshAndSort();
            if (taskData) {
                nProgress.set(0.5);
                const ud = await getUserData();
                if(ud){
                    nProgress.done();
                    console.log(groups);
                    setIsMounted(true);
                }
            }
        };
        init();
    }, []);

    return (
        <div>
            <Head>
                <title>Home - Task Trak</title>
            </Head>
            {isMounted ? (
                <StyledMyTasks>
                    <div className="container">
                        <div className="sticky-title-container">
                            <div className="sticky-title"></div>
                            <h1 className="title">Welcome, {userData.firstName}</h1>
                        </div>
                        <div className="listgroup">
                            <TaskList title="Not Started">
                                {
                                    groups[0].children.map((task, i: number) => (
                                        <TaskBtn title={task.name} tags={
                                            task.properties.tags ? (
                                                task.properties.tags.map((tag, i) => {
                                                    console.log(tag, i);
                                                    return { urgent: tag.urgent, name: tag.name }
                                                })
                                            ) : ''
                                        } />
                                    ))
                                }
                            </TaskList>
                            <TaskList title="In Progress">

                            </TaskList>
                            <TaskList title="Completed">

                            </TaskList>
                        </div>
                    </div>
                </StyledMyTasks>
            ) : ''}
        </div>
    )
};

export default ListView;