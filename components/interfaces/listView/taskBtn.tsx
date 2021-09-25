import { useState } from "react";
import styled from "styled-components";
import mixins from "styles/mixins";
import { IconArrowDown } from "../../../assets/images";
import { useDrag } from "react-dnd";
import { TaskBtnProps } from 'types';

interface BarProps {
    isOpen: boolean
}

const StyledBar = styled.div<BarProps>`
    ${mixins.flexCenter}
    font-family: var(--font-default) !important;
    width: 100%;
    .bar {
        ${mixins.flexCenter}
        flex-direction: column;
        max-height: 100px;
        width: 80% !important;
        height: 130px;
        max-height: 150px;
        border: 2px solid var(--card-border);
        overflow: hidden;
        border-radius: var(--border-radius);
        background-color: var(--secondary-bg);
        padding: 5px 5px 10px 5px;
        margin: 10px 0;
        transition: height 0.5s cubic-bezier(0, 0.55, 0.45, 1);

        &:hover {
            cursor: pointer;
        }

        .heading {
            ${mixins.flexCenter}
            flex-direction: row !important;
        }

        &.collapsed {
            ${mixins.flexBetween}
            height: 40px;
            margin: 5px 0;
            padding: 5px;
            flex-direction: row;
            transition: var(--transition);

            &:hover {
                background-color: #fafafc;
                transition: var(--transition);
            }

            h1 {
                font-family: var(--font-default) !important;
                font-size: var(--f-sm);
                margin: 0;
                padding: 0;
                width: auto;
            }
            .tags {
                justify-content: flex-end !important;
                width: auto;
                padding: 0;
                overflow: hidden;
                .tag {
                    font-family: var(--font-default) !important;
                    content: "";
                    height: 15px !important;
                    width: 10px !!important;
                    overflow: hidden;
                    -webkit-border-radius: 100% !important;
                    -moz-border-radius: 100% !important;
                    border-radius: 100% !important;
                    margin: 2px;
                    transform: scale(0.7);

                    &.nonUrgent {
                        background-color: #3BBAF1;
                    }
                    &.urgent {
                        background-color: #FD6150;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
                .tag-name {
                    font-family: var(--font-default) !important;
                    display: none !important;
                }
            }
            .controls {
                padding: 0 10px 0 0;
                .expand {
                    position: relative;
                    margin: 0;
                    padding: 0;
                    height: 24px;
                    width: 24px;
                    color: var(--cf-label);
                    transform: rotate(0deg) !important;
                    transition: transform 0.5s cubic-bezier(0, 0.55, 0.45, 1);
                }
            }
            p {
                display: none;
            }
        }

        h1 {
            font-family: var(--font-default) !important;
            font-size: var(--f-md);
            margin: 5px !important;
            padding: 0;
            max-width: 250px;
            overflow: hidden;
            transition: transform 0.5s cubic-bezier(0, 0.55, 0.45, 1);
        }
        .tags {
            ${mixins.flexCenter}
            flex-direction: row;
            width: 100%;
            font-size: var(--f-xs);
            max-height: 20px;
            padding: 0 0 5px 0;

            .tag {
                ${mixins.flexCenter}
                flex-direction: row;
                margin: 5px;
                background-color: var(--secondary-bg);
                height: 20px;
                width: auto;
                border-radius: 10px;
                padding: 1px 8px;
                transition: var(--transition);
                font-family: var(--font-default) !important;
                overflow: hidden;

                &.nonUrgent {
                    background-color: #3BBAF1;
                    color: var(--cf-white);
                    opacity: 1;
                    transition: opacity 0.6s cubic-bezier(0, 0.55, 0.45, 1); 
                }
                &.urgent {
                    background-color: #FD6150;
                    color: var(--cf-white);
                    opacity: 1;
                    transition: opacity 0.6s cubic-bezier(0, 0.55, 0.45, 1);
                }

                &:hover {
                    opacity: 0.8;
                    transition: var(--transition);
                    cursor: default;
                }

                .tag-name {
                    font-family: var(--font-default) !important;
                    font-size: var(--f-xxs);
                    ${mixins.flexCenter}
                    margin: 0;
                    padding: 0;
                }
            }
        }
        .controls {
            .expand {
                color: var(--cf-label);
                transform: rotate(180deg);
                transition: transform 0.5s cubic-bezier(0, 0.55, 0.45, 1);
                &:hover {
                    cusor: pointer;
                    opacity: 0.8;
                    transition: all 0.6s cubic-bezier(0, 0.55, 0.45, 1);
                }
            }
        }
        p {
            margin: 0px 0 10px 0;
            padding: 0;
            font-family: var(--font-default);
            font-size: var(--f-xs);
        }
    }
`;

const TaskBtn = (config: TaskBtnProps) => {

    const { title, tags, taskId, description } = config;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "bar", // enum for later?
        item: { id: taskId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const [isOpen, setIsOpen] = useState(false);
    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledBar isOpen={isOpen}>
            <button className={"bar" + (isOpen ? "" : " collapsed")} id="2" onClick={() => handleToggleOpen()} style={isDragging ? { opacity: 0.5, border: "1px solid var(--primary-accent)", transition: "none" } : { opacity: 1, border: "none" }} ref={drag}>
                <div className="heading">
                    <div className="statusIcon">
                        <div className="icon-check"></div>
                    </div>
                    <h1>{title}</h1>
                    <div className="controls">
                        <div className="expand">
                            <IconArrowDown />
                        </div>
                    </div>
                </div>
                <p>{description}</p>
                <div className="tags">
                    {tags.map((tag: any, i: number) => (
                        <div className={"tag" + (tag.urgent === "urgent" ? " urgent" : " nonUrgent")} key={i}>
                            <p className="tag-name">{tag.name}</p>
                        </div>
                    ))}
                </div>
            </button>
        </StyledBar>
    );
}

export default TaskBtn;