import { useState, useEffect } from 'react';
import AlertBox, { ANIM } from './alertBox';
import styled from 'styled-components';
import { mixins } from 'styles';
import TagInput from './TagInput';
import { ContextCreateTask, NewTaskConfig } from '../types';
import { uuid } from 'uuidv4';

export interface CreateTaskProps {
    onSuccess?: (prop: ContextCreateTask) => void,
    onCancel?: () => void,
    show: boolean
}

const StyledCreateTaskProps = styled.div`
    .create-task {
        ${mixins.flexCenter}
        flex-direction: column;

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
    }
`;


const CreateTask = (config: CreateTaskProps) => {
    /****************************************************************
     * Boilerplate for AlertBox
     ****************************************************************/
    const [alertShown, setAlertShow] = useState(false);
    const [tagComponents, setTagComponents] = useState([]);
    const [tagResults, setTagResults] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDesc, setNewTaskDesc] = useState("");

    const tagProp = (<TagInput key={tagComponents.length > 0 ? tagComponents.length + 1 : 1} isSubmitting={isSubmitting} onSubmit={() => handleTagSubmit} />);

    const handleTagSubmit = (tag) => {
        setTagResults([...tagResults, tag]);
    };

    const showAlert = () => {
        setTagComponents([tagProp]);
        setAlertShow(true);
    };
    const hideAlert = () => {
        // if no delay then the exit animation does not work
        setTimeout(() => {
            setAlertShow(false);
        }, ANIM);
    };
    const handleSuccess = (onSuccess: any) => {
        setIsSubmitting(true); // tell tag components we're done
        const checkTags = () => {
            if (tagResults.length < tagComponents.length) {
                setTimeout(checkTags, 100); // check every 100ms for tags to be done
            } else {
                // tags are done
            }
        }
    }
    const handleCancel = (cancelFunc?: () => void) => {
        hideAlert();
        cancelFunc && cancelFunc();
    }
    const defaultCreateTaskProps = (
        <div className="create-task">
            <input type="text" name="task-name" placeholder="Name" value="" onChange={(e) => {
                setNewTaskName(e.target.value);
            }} />
            <input type="text" name="task-description" placeholder="Description" value="" onChange={(e) => {
                setNewTaskDesc(e.target.value);
            }} />
            {'' /* todo: add date picker for timezone, start & end date */}
            <div className="taglist">
                {
                    tagComponents && tagComponents.map((tagComponent, i) => (
                        <div className="tag" key={i}>
                            {tagComponent}
                        </div>
                    ))
                }
            </div>
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