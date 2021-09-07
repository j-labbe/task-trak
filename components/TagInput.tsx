import { useState, useEffect } from "react";
import styled from "styled-components";
import { mixins } from "styles";
import { Tag } from "types";

const StyledTagCreator = styled.div`
    ${mixins.flexCenter}
    background-color: #EFF0F6;
    width: 275px;
    padding: 10px;
    margin-top: 0px;
    margin-bottom: 20px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border-left: 2px solid #D9DBE9;
    border-right: 2px solid #D9DBE9;
    border-bottom: 2px solid #D9DBE9;

    @media(max-width: 768px){
        width: 100%;
    }

    .container {
        ${mixins.flexCenter}
        flex-direction: row;
        padding: 0 !important;

        @media(max-width: 768px){
            flex-direction: column;
        }
        label {
            font-size: var(--f-xs);
            color: var(--cf-label);
        }
        h3 {
            margin: 0 0 10px 0;
            padding: 0;
            font-weight: 400;
            font-size: var(--f-sm);
        }
        input {
            margin: 0;
            background-color: #D9DBE9 !important;

            &:focus,
            &:active {
                background-color: #EFF0F6 !important;
            }
        }
        select {
            font-family: var(--font-default);
            margin: 10px;
            width: 100%;
            padding: 10px;
            outline: none;
            border: none;
            border-radius: var(--border-radius);
            background-color: #D9DBE9;
        }
    }
`;

type TagInputProps = {
    id: number;
    setTagDetails: any;
    tagState: any;
}

const TagInput = ({ id, setTagDetails, tagState }: TagInputProps) => {
    // We set a local state for reference before passing to parent
    const [tagAttrs, setTagAttrs] = useState({ id: 0, name: "", urgent: "" });

    const handleNameChange = (e) => {
        setTagAttrs({ id: id, name: e.target.value, urgent: tagAttrs.urgent })
        setTagDetails({
            id: id,
            name: e.target.value,
            urgent: tagAttrs.urgent
        });
    };
    const handleSelectChange = (e) => {
        setTagAttrs({ id: id, name: tagAttrs.name, urgent: e.target.value });
        setTagDetails({
            id: id,
            name: tagAttrs.name,
            urgent: e.target.value
        });
    };

    return (
        <StyledTagCreator key={id}>
            <div key={id} className="container">
                <input key={id} type="text" placeholder="Tag Name" value={tagAttrs.name} onChange={handleNameChange} />
                <select key={id + "-" + 1} value={tagAttrs.urgent} onChange={handleSelectChange}>
                    <option key={id + "-" + 2} value="">Tag Status</option>
                    <option key={id + "-" + 3} value="urgent">Urgent</option>
                    <option key={id + "-" + 4} value="nonUrgent">Non-Urgent</option>
                </select>
            </div>
        </StyledTagCreator>
    )
}

export default TagInput;