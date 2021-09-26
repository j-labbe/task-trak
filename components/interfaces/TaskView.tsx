/**
 * Task View Interface
 * 
 * Shows moderate details
 */
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppContext";
import mixins from 'styles/mixins';
import { useRouter } from "next/router";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from "moment";

const StyledTaskView = styled.div`
    position:absolute;
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

        .task-container {
            ${mixins.flexCenter}

            .task {
                ${mixins.flexCenter}
                flex-direction: column;
                background-color: var(--default-bg);
                width: 60%;
                max-height: 400px;
                border-radius: var(--border-radius);
                border: 2px solid var(--card-border);
                box-shadow: var(--sm-box-shadow);
                overflow-y: auto;
                padding: 0 30px 10px 30px;

                @media(max-width: 768px){
                    width: 80%;
                }
                @media(max-width: 650px){
                    width: 90%;
                }

                .meta {
                    ${mixins.flexCenter}
                    align-items: flex-start;
                    flex-direction: row;
                    

                    h3{
                        font-weight: 400;
                        font-size: var(--f-sm);
                        color: var(--cf-meta);
                        margin-right: 10px;
                    }
                }
            }

        }

    }

`;

// build out individual task views here

const TaskView = ({ displayTask }) => {

    const Router = useRouter();
    const { tasks } = useContext(AppContext);
    const [isMounted, setIsMounted] = useState(false);
    const taskId: number = displayTask;

    useEffect(() => {
        const testTasks = async () => {
            if (!tasks[taskId]) {
                return Router.push('/app/');
            }
            setIsMounted(true);
        };
        testTasks();
    });

    // display selectedTask only

    const thisTask = tasks[taskId];

    return (
        <StyledTaskView>
            {isMounted ?
                <div className="container">
                    <h1>Task View</h1>
                    <TransitionGroup component={null}>
                        <CSSTransition classNames="fastfadeup" timeout={2000}>
                            <div className="task-container">
                                <div className="task">
                                    <h1>{thisTask.name}</h1>
                                    <p>{thisTask.description}</p>
                                    <div className="line"></div>
                                    <div className="meta">
                                        <h3><strong>Started:</strong> {thisTask.properties.startDate}</h3>
                                        <h3><strong>Ends:</strong> {thisTask.properties.endDate}</h3>
                                        <h3><strong>Days Remaining:</strong> {
                                            moment(Date.now(),"DD/MM/YYYY").diff(moment(thisTask.properties.endDate, "DD/MM/YYYY"))
                                        }</h3>

                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                : ''}
        </StyledTaskView>
    )
};

export default TaskView;