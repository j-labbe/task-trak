import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mixins } from "../../styles";
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
            z-index:20;

            @supports ((--webkit-backdrop-filter: none) or (backdrop-filter: none)){
                background-color: rgba(247, 247, 252, 0.5);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            }
        }
        .title {
            position: fixed;
            z-index: 21;
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
            @media(max-width: 1176px) {
                justify-content: flex-start;
                align-items: center;
                margin-top: 20px;
            }
        }
    }
`;

const ListView = () => {
    const { refreshTasks, userData, getUserData } = useContext(AppContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    let groups: GroupType = [];
    groups[0] = { title: "Not Started", children: [] };
    groups[1] = { title: "In Progress", children: [] };
    groups[2] = { title: "Completed", children: [] };

    const refreshAndSort = async (config: { callback: () => void }) => {
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
        config.callback();
    };

    useEffect(() => {
        if (!isLoaded && !isMounted) {
            nProgress.start();
            getUserData().then(() => {
                nProgress.set(0.5);
                refreshAndSort({
                    callback: () => setIsLoaded(true)
                });
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
                <div className="container">
                    <div className="sticky-title-container">
                        <div className="sticky-title"></div>
                        {isMounted ? (
                            <CSSTransition classNames={"fadedown"} timeout={4000}>
                                <h1 className="title">Welcome, {userData.firstName}</h1>
                            </CSSTransition>
                        ) : ''}
                    </div>
                    <div className="listgroup">
                        <TransitionGroup component={null}>
                            {isMounted ?
                                sortedData.map((group, i) => (
                                    <CSSTransition key={i} classNames={"fastfadeup"} timeout={2000 + (i * 100)}>
                                        <TaskList title={group.title} key={i} style={{transitionDelay: `${i*75}ms`}}>
                                            <TransitionGroup component={null}>
                                                {
                                                    sortedData[i].children.map((child, o: number) => (
                                                        <TaskBtn
                                                            title={child.name}
                                                            tags={child.properties.tags.map((tag, k) => ({
                                                                urgent: tag.urgent,
                                                                name: tag.name
                                                            }))}
                                                            style={{ transitionDelay: `${o * 1000}ms` }}
                                                            pos={o}
                                                            key={o}
                                                            taskId={child.id}
                                                        />
                                                    ))
                                                }
                                            </TransitionGroup>
                                        </TaskList>
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