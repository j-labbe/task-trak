import { useState, useEffect } from "react";
import styled from "styled-components";
import { mixins } from "styles";

const StyledTagCreator = styled.div`
    ${mixins.flexCenter}
    background-color: #EFF0F6;
    max-width: 200px;
    border-radius: var(--border-radius);
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 2px solid #D9DBE9;

    .container {
        ${mixins.flexCenter}
        flex-direction: column;
        padding: 0 !important;

        label {
            font-size: var(--f-xs);
            color: var(--cf-label);
        }
        input {
            background-color: #D9DBE9 !important;

            &:focus,
            &:active {
                background-color: #EFF0F6 !important;
            }
        }
    }
`;

type TagProps = {
    isSubmitting: boolean,
    onSubmit: (tag) => void
}

const TagInput = ({isSubmitting, onSubmit}: TagProps) => {

    const [tagAttrs, setTagAttrs] = useState({ name: "", urgent: "" });

    const handleNameChange = (e) => {
        setTagAttrs({ name: e.target.value, urgent: tagAttrs.urgent });
    };
    const handleSelectChange = (e) => {
        setTagAttrs({ name: tagAttrs.name, urgent: e.target.value });
    };

    useEffect(() => {
        if(isSubmitting){
            onSubmit(tagAttrs);
        }
    },[isSubmitting]);

    return (
        <StyledTagCreator>
            <div className="container">
                <label htmlFor="tag-name">Tag Name</label>
                <input type="text" id="name" name="tag-name" onChange={handleNameChange} />
                <label htmlFor="tag-status">Tag Status</label>
                <select name="tag-status" id="tag-status" value={tagAttrs.urgent} onChange={handleSelectChange}>
                    <option value="">Select</option>
                    <option value="urgent">Urgent</option>
                    <option value="nonUrgent">Non-Urgent</option>
                </select>
            </div>
        </StyledTagCreator>
    )
}

export default TagInput;