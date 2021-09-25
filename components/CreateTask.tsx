/**
 * Modal Box including Create Task interface & logic
 */
import React, { useState, useEffect } from 'react';
import AlertBox, { ANIM } from './alertBox';
import styled from 'styled-components';
import mixins from 'styles/mixins';
import TagInput from './TagInput';
import { ContextCreateTask, Tag, Tags } from 'types';
import { v4 } from 'uuid';
import _ from 'lodash';

export interface CreateTaskProps {
    onSuccess?: (prop: ContextCreateTask) => void,
    onCancel?: () => void,
    show: boolean
}

const StyledCreateTaskProps = styled.div`
    width: 100%;
    .create-task {
        ${mixins.flexCenter}
        flex-direction: column;
        width: 65%;

        .add-tag-btn {
            width: 100px;
            margin: 2px;
            border: none;
            background-color: var(--primary-accent);
            color: var(--cf-white);
            font-family: var(--font-default);
            padding: 5px;
            border-radius: var(--border-radius);

            &:hover {
                cursor: pointer;
            }
        }

        input {
            margin: 10px 0 10px 0;
            height: 40px;
            width: 100%;
            padding: 15px;
            font-family: var(--font-default);
            border: none;
            background-color: #EFF0F7;
            border-radius: var(--border-radius);
            transition: var(--transition);

            &:active,
            &:focus {
                outline: none;
                border: 0px solid rgba(20, 20, 43, 0.8);
                box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.35);
                background-color: var(--default-bg);
                transition: var(--transition);
            }
        }
        .header{
            ${mixins.flexBetween}
            margin-top: 10px;
            padding: 3px 10px 3px 10px;
            width: 100%;
            background-color: #EFF0F6;
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            border-top: 2px solid #D9DBE9;
            border-left: 2px solid #D9DBE9;
            border-right: 2px solid #D9DBE9;

            h2 {
                font-size: var(--f-sm);
                margin: 0;
                padding: 0;
            }
            .del-btn {
                position: relative !important;
                z-index: 20 !important;
                border: none !important;
                outline: none !important;
                background-color: none !important;
                color: var(--cf-meta) !important;
                font-family: var(--font-default) !important;
                margin: 0 !important;
    
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`;

const CreateTask = (config: CreateTaskProps) => {

    // Functional
    const [alertShown, setAlertShown] = useState(false);
    // Task Properties
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDesc, setNewTaskDesc] = useState("");
    // Tags
    const [tagState, setTagState] = useState([]);
    const [tagComponents, setTagComponents] = useState([]);

    // update the tags storage until saved
    const handleTagChange = async (details: Tag) => {
        let tagArray: Tags = [...tagState];
        const { id, name, urgent } = details;
        const i = tagArray.findIndex(tag => tag.id === id);
        if (i !== -1) {
            tagArray[i].name = name;
            tagArray[i].urgent = urgent;
        } else {
            tagArray = [...tagArray, details];
        }
        setTagState(tagArray);
    };

    const TagProp = (<TagInput
        key={tagComponents.length + 1}
        id={tagComponents.length + 1} // first tag is ID 1, array pos 0
        setTagDetails={handleTagChange}
        tagState={tagState}
    />);

    const handleTaskNameChange = (e) => setNewTaskName(e.target.value);
    const handleTaskDescChange = (e) => setNewTaskDesc(e.target.value);
    const handleAddTag = () => {
        if (tagComponents.length >= 5) return;
        setTagComponents([...tagComponents, TagProp]);
    }
    const handleRemoveTag = (id: number) => {
        const i = tagComponents.findIndex(tag => tag.props.id === id);
        if (i !== -1) {
            const u = [...tagComponents];
            const updateArr = (a, v) => a.filter((e) => e.props.id !== v);
            const update = updateArr(u, id);
            setTagComponents(update);
        }
    };
    const handleSuccess = (callback) => {
        const val = {
            id: v4(),
            name: newTaskName,
            description: newTaskDesc,
            properties: {
                tags: tagState
            }
        }
        callback(val);
        setAlertShown(false);
    };
    const handleCancel = (callback) => {
        callback();
        setTimeout(() => {
            setAlertShown(false);
        }, ANIM);
    }
    const showAlert = () => setAlertShown(true);
    const hideAlert = () => setAlertShown(false);


    const defaultCreateTaskProps = (
        <div className="create-task">
            <input type="text" autoComplete="off" name="task-name" placeholder="Name" value={newTaskName} onChange={(e) => handleTaskNameChange(e)} maxLength={30} />
            <input type="text" autoComplete="off" name="task-description" placeholder="Description" value={newTaskDesc} onChange={(e) => handleTaskDescChange(e)} maxLength={70} />
            {'' /* todo: add date picker for timezone, start & end date */}
            <div className="taglist">
                {
                    tagComponents.map((tagComponent, i) => {
                        return (
                            <div className="tag" key={i}>
                                <div className="header">
                                    <h2>Tag {tagComponent.props.id}</h2>
                                    {/* first tag is id 1, array pos 0 */}
                                    <button className="del-btn" onClick={() => handleRemoveTag(tagComponent.props.id)}>x</button>
                                </div>
                                {tagComponent}
                            </div>
                        )
                    })
                }
            </div>
            <button className="add-tag-btn" onClick={handleAddTag}>Add Tag</button>
        </div>
    );
    let alertBoxConfig = {
        title: "Create a New Task",
        successBtnLabel: "Create",
        cancelBtnLabel: "Cancel",
        onSuccess: () => handleSuccess(config.onSuccess ? config.onSuccess : undefined),
        onCancel: () => handleCancel(config.onCancel ? config.onCancel : undefined),
        props: defaultCreateTaskProps,
        onClickOutside: () => handleCancel(config.onCancel ? config.onCancel : undefined)
    }
    useEffect(() => {
        if (config.show) {
            showAlert();
        } else {
            hideAlert();
        }
    }, [config.show]);

    /*****************************************************************/

    return (
        <StyledCreateTaskProps>
            {alertShown ? <AlertBox {...alertBoxConfig} /> : ''}
        </StyledCreateTaskProps>
    )
}

export default CreateTask;