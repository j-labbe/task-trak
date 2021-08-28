import { useState } from "react";
import styled from "styled-components";
import { mixins } from "../../styles";
import { IconArrowDown } from "../../assets/images";

export interface BarProps {
    isOpen: boolean
}

const StyledBar = styled.div<BarProps>`
    ${mixins.flexCenter}
    width: 100%;
    .bar {
        ${mixins.flexCenter}
        flex-direction: column;
        max-height: 100px;
        width: 80%;
        height: 80px;
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
                font-size: var(--f-sm);
                margin: 0;
                padding: 0;
                width: auto;
            }
            .tags {
                justify-content: flex-end !important;
                width: auto;
                .tag {
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
        }

        h1 {
            font-size: var(--f-md);
            margin: 5px !important;
            padding: 0;
        }
        .tags {
            ${mixins.flexCenter}
            flex-direction: row;
            width: 100%;
            font-size: var(--f-xs);
            max-height: 20px;

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
    }
`;

const TaskBtn = ({ title, tags }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledBar isOpen={isOpen}>
            <button className={"bar" + (isOpen ? "" : " collapsed")} id="2" onClick={() => handleToggleOpen()}>
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
                <div className="tags">
                    {tags.map((tag: any, i: number) => (
                        <div className={"tag" + (tag.urgent ? " urgent" : " nonUrgent")} key={i}>
                            <p className="tag-name">{tag.name}</p>
                        </div>
                    ))}
                </div>
            </button>
        </StyledBar>
    );
}

export default TaskBtn;