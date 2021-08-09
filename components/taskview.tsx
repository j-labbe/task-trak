import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
import { mixins } from "../styles";
import { tasks } from "../demo";
import Router from "next/router";

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
                width: 100%;
                max-height: 400px;
                border-radius: var(--border-radius);
                border: 2px solid var(--card-border);
                box-shadow: var(--sm-box-shadow);
                overflow-y: auto;

                .meta {
                    ${mixins.flexCenter}
                    align-items: flex-start;

                    h3{
                        font-weight: 400;
                        font-size: var(--f-md);
                    }
                }
            }

        }

    }

`;

// build out individual task views here

const TaskView = ({ displayTask }) => {

    const { changeSelectedTask, 
        resetSelectedTask, 
        selectedTask } = useContext(AppContext);

        // display selectedTask only

    

    return (
        <StyledTaskView>
            <div className="container">
                <h1>Task View</h1>
                <div className="task-container">
                    <div className="task">
                        <h1>Test Task</h1>
                        <div className="line"></div>
                        <div className="meta">
                            <h3>Started: </h3>
                            <h3>Ends: </h3>
                            <h3>Days Remaining: </h3>

                        </div>
                    </div>
                </div>
            </div>
        </StyledTaskView>
    )
};

export default TaskView;