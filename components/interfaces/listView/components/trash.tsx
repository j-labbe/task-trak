import { useEffect, useState } from "react";
import styled from "styled-components";
import mixins from "styles/mixins";
import { IconTrash } from '../../../../assets/images';
import { useDrop } from "react-dnd";
import { useContextState } from 'contexts/AppContext';

type StyledTBinContainerProps = {
    canDrop: boolean
}

type StyledTBinProps = {
    isOver: boolean
};

const StyledTrashBinContainer = styled.div<StyledTBinContainerProps>`
    position: fixed;
    left: ${props => props.canDrop ? `120px` : `0px`};
    opacity: ${props => props.canDrop ? `1` : `0`};
    bottom: 20px;
    transition: var(--transition);
`

const StyledTrashBin = styled.div<StyledTBinProps>`
    ${mixins.flexCenter}
    margin: 5px;
    background-color: var(--red);
    width: 50px;
    height: 50px;
    border-radius: 100%;
    color: var(--cf-white);
    filter: drop-shadow(0px 0px 72px rgba(0, 0, 0, 0.04));
    transform: scale(${props => props.isOver ? `1.4` : `1`});
    transition: var(--transition);
`;


const TrashBin = () => {

    const { deleteTask } = useContextState();

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "bar",
        drop: async (item: { id: string }, monitor) => {
            deleteTask({ taskId: item.id });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    return (
        <StyledTrashBinContainer canDrop={canDrop}>
            <StyledTrashBin isOver={isOver} ref={drop}>
                <IconTrash />
            </StyledTrashBin>
        </StyledTrashBinContainer>
    )
}

export default TrashBin;