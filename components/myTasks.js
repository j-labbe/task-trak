import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mixins } from "../styles";
import { tasks, settings } from "../demo/data";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppContext } from "../contexts/AppContext";

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
                height: 175px;
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

            }
        }

    }

`;

const MyTasks = () => {
    const [isMounted, setIsMounted] = useState(false);

    const { changeSelectedTask } = useContext(AppContext);

    const userTasks = tasks;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <StyledMyTasks>
            <div className="container">
                <h1>My Tasks</h1>
                <div className="taskList">
                    <TransitionGroup component={null}>
                        {isMounted ? userTasks && userTasks.map((task, i) => (
                            <CSSTransition key={i} classNames="fastfadeup" timeout={2000}>
                                <div className="task" style={{ transitionDelay: `${i + 2}00ms` }}>
                                    <h1>{task.name}</h1>
                                    <p className="desc">{task.description}</p>
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
                                    <button key={i} id={"btn-" + i} onClick={() => changeSelectedTask(i)}>Click to View Details</button>
                                </div>
                            </CSSTransition>
                        )) : ''}
                    </TransitionGroup>
                </div>
            </div>
        </StyledMyTasks>
    )
};

export default MyTasks;