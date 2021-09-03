import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { mixins } from "../../styles";
import { useDrop } from 'react-dnd';

const StyledListGroup = styled.div`
    ${mixins.flexCenter}
    justify-content: flex-start;
    padding: 20px 0;
    flex-direction: column;
`;
const StyledList = styled.div`
    ${mixins.flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 30px;
    width: 300px;
    background-color: var(--default-bg);
    border: 2px solid var(--card-border);
    border-radius: var(--border-radius);
    height: auto;
    padding-bottom: 20px;

    @media(max-width: 1176px){
        margin: 0 20px;
        width: 500px;
    }
    @media(max-width: 916px){
        margin: 0 10px;
    }
    @media(max-width: 768px) {
        margin: 10px 0;
        width: 300px;
    }
`;

type TaskListProps = {
    title: string,
    listId: number, // to double check the task progress
    children: any,
    style?: object
};

type ItemType = { // comes from taskbtn dnd
    id: number
};

const TaskList = ({ title, listId, children, style }: TaskListProps) => {



    const [list, setList] = useState([]);
    let tempList = [];

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "bar",
        drop: (item: ItemType) => addToList(item.id)
    }))

    const addToList = (taskId: number) => {

        // setList([...list, taskChild]);
    };

    const listContents = () => {
        if (list.length > 0) setList([]);
        if (tempList.length > 0) tempList = [];
        React.Children.forEach(children, element => {
            React.Children.forEach(element.props.children, (elem: React.ReactNode) => {
                console.log(elem);
                if (!React.isValidElement(elem)) return;
                const { progress, taskId } = elem.props;
                if (progress === listId) {
                    tempList.push(elem); // spread
                    setList(tempList);
                }
            })
        });
    }

    useEffect(() => {
        listContents();
    }, [children]);

    return (
        <div {...style ? (style = { style }) : ''}>
            <StyledListGroup>
                <StyledList>
                    <h3>{title}</h3>
                    <div id="list" ref={drop}>
                        {list}
                    </div>
                </StyledList>
            </StyledListGroup>
        </div>
    );
};

export default TaskList;