import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mixins } from "../../styles";
import { settings } from "../../demo";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppContext, TaskTypes, UserDataTypes } from "../../contexts/AppContext";
import Router from 'next/router';
import nProgress from "nprogress";
import Head from "next/head";
import AlertBox, { ANIM } from '../alertBox';
import TaskBtn from './taskBtn';
import TaskList from './taskList';

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
    const { refreshTasks, userData, getUserData } = useContext(AppContext);
    const [isMounted, setIsMounted] = useState(false);

    let groups = [];
    groups[0] = { title: "Not Started", children: [] };
    groups[1] = { title: "In Progress", children: [] };
    groups[2] = { title: "Completed", children: [] };

    useEffect(() => {
        nProgress.start();


        refreshTasks().then(async (res: TaskTypes) => {
            res.forEach((task) => {
                if(task.progress === 0){
                    groups[0].children.push(task);
                }else if(task.progress === 1){
                    groups[1].children.push(task);
                }else groups[2].children.push(task);
            });
            getUserData().then(async (res: UserDataTypes) => {
                setIsMounted(true);
                nProgress.done();
                console.log(groups);
                console.log(userData);
            }).catch((e) => {
                nProgress.done();
                console.error(e);
            });
        }).catch((e) => {
            nProgress.done();
            console.error(e);
        });

        return () => {
            nProgress.done();
        }
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
                                <TaskBtn title="Title" tags={
                                    [{ urgent: true, name: "Needs help" }, { urgent: false, name: "Reviewed" }]
                                } />
                                <TaskBtn title="Title 2" tags={
                                    [{ urgent: false, name: "Needs help" }, { urgent: true, name: "Reviewed" }]
                                } />
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