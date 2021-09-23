import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mixins } from "../../../styles";
import { settings } from "../../../demo";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppContext } from "../../../contexts/AppContext";
import Router from 'next/router';
import nProgress from "nprogress";
import Head from "next/head";
import AlertBox, { ANIM } from 'components/alertBox';

const StyledMyTasks = styled.div`
    position: absolute;
    top: 96px !important;
    left: 96px !important;
    right: 0 !important;
    bottom: 0 !important;
    width: calc(100% - 100px);
    overflow: auto;

    .container {
        padding-left: 30px;
        padding-right: 25px;
        width: 100%;

        h1 {
            margin-top: 20px;
        }

        .taskList {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            place-items: center;

            @media(max-width: 1170px) {
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(3, 1fr);
            }
            @media(max-width: 768px) {
                grid-template-columns: repeat(1, 1fr);
                grid-template-rows: repeat(4, 1fr);
            }
            
            .task {
                ${mixins.flexCenter}
                align-items: flex-start;
                flex-direction: column;
                width: 100%;
                max-width: 500px;
                height: 250px;
                padding: 20px;
                border: 2px solid var(--card-border);
                background-color: var(--default-bg);
                border-radius: var(--border-radius);
                box-shadow: var(--sm-box-shadow);

                h1 {
                    margin-top: 0;
                    margin-bottom: 10px;
                    font-size: var(--f-md);
                    font-weight: 500;
                }

                p{
                    margin: 2px 0;
                }

                .desc {
                    font-size: var(--f-sm);
                    color: var(--cf-label);
                    margin-bottom: 5px;
                }

                .date {
                    font-size: var(--f-sm);
                    color: var(--cf-meta);
                }
                
                .btn {
                    font-family: var(--font-default);
                    margin-top: 10px;
                    padding: 9px 22px;
                    outline: none;
                    border: none;
                    border-radius: 12px;
                    background-color: var(--primary-accent);
                    color: var(--cf-white);
                    cursor: pointer;
                    transition: var(--transition);

                    &:hover{
                        background-color: var(--primary-accent-hover);
                        transition: var(--transition);
                    }
                }
            }
        }

    }

`;

const MyTasks = () => {
    const { tasks, refreshTasks } = useContext(AppContext);
    const [isMounted, setIsMounted] = useState(false);
    const [alertShown, setAlertShow] = useState(false);
    const [alertProps, setAlertProps] = useState(<div>Error</div>);
    const [visibleAlertId, setAlertId] = useState(Number);
    const navToPage = (id: string) => {
        Router.push(`/app/task/${id}`, undefined, { shallow: true });
    };
    const showAlert = (props: any) => {
        setAlertProps(props);
        setAlertShow(true);
    };
    const hideAlert = () => {
        // if no delay then the exit animation does not work
        setTimeout(() => {
            setAlertShow(false);
        }, ANIM + 100);
    };
    const handleSuccess = (id: number) => {
        hideAlert();
        navToPage(id.toString());
    };
    let alertBoxConfig = {
        title: "Task Details",
        successBtnLabel: "Visit",
        cancelBtnLabel: "Close",
        onSuccess: () => handleSuccess(visibleAlertId),
        onCancel: () => hideAlert(),
        props: alertProps,
        onClickOutside: () => hideAlert()
    }
    useEffect(() => {
        nProgress.start();
        refreshTasks().then((res: any[]) => {
            setIsMounted(true);
            nProgress.done();
            //showAlert();
        }).catch((e) => {
            console.error(e);
            nProgress.done();
        });
        return () => {
            nProgress.done();
        }
    }, []);

    return (
        <div>
            <StyledMyTasks>
                {alertShown ? (
                    <div id="alertBoxLocation">
                        <AlertBox {...alertBoxConfig} />
                    </div>
                ) : ''}


                <div className="container">
                    <h1>My Tasks</h1>
                    <div className="taskList">

                        <TransitionGroup component={null}>

                            {isMounted ? tasks && tasks.map((task: {
                                name: string,
                                description: string,
                                properties: {
                                    startDate: string,
                                    endDate: string
                                }
                            }, i: number) => {
                                let passProps: any;
                                passProps = (
                                    <div>
                                        <h1>{task?.name || 'Untitled'}</h1>
                                        <p className="desc">{task?.description || 'No description available.'}</p>
                                        <p className="date">Started
                                            {
                                                " " + moment(task.properties.startDate).format("MM-DD-YYYY")
                                                + (
                                                    settings.displayTime ?
                                                        " at "
                                                        + moment(task.properties.startDate).format("h:mm a")
                                                        : ""
                                                )
                                            }
                                        </p>
                                        <p className="date">Ending
                                            {
                                                " " + moment(task.properties.endDate).format("MM-DD-YYYY")
                                                + (
                                                    settings.displayTime ?
                                                        " at "
                                                        + moment(task.properties.endDate).format("h:mm a")
                                                        : ""
                                                )
                                            }
                                        </p>
                                        {/* <button className="btn" key={i} id={"btn-" + i} onClick={() => navToPage(i.toString())}>Click to View Details</button> */}
                                    </div>);

                                return (
                                    <CSSTransition key={i} classNames="fastfadeup" timeout={2000}>
                                        <div className="task" style={{ transitionDelay: `${i + 2}00ms` }}>
                                            {passProps}
                                            <button className="btn" key={i} id={"btn-" + i} onClick={() => {
                                                setAlertId(i);
                                                showAlert(passProps);
                                            }}>Click to View Details</button>
                                        </div>
                                    </CSSTransition>
                                )
                            }
                            )
                                : ''}
                        </TransitionGroup>
                    </div>
                </div>
            </StyledMyTasks>
        </div>
    )
};

export default MyTasks;