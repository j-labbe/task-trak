import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mixins } from 'styles';
import "react-datepicker/dist/react-datepicker.css";
import useOnClickOutside from 'utils/useOnClickOutside';

export const ANIM = 500;

export interface AlertBoxProps {
    isVisible: boolean
}

const StyledAlertBox = styled.div<AlertBoxProps>`
    ${mixins.flexCenter}
    position: absolute;
    background-color: ${props => (props.isVisible ? `var(--overlay)` : `transparent`)};
    ${props => (props.isVisible ? `` : `opacity: 0;`)}
    z-index: ${props => (props.isVisible ? `50` : `-1`)};
    width: 100%;
    height: 100%;
    transition: var(--transition);

    @supports ((--webkit-backdrop-filter: none) or (backdrop-filter: none)){
        ${'' /* Add support for different styled based on browser support (check modal) */}
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
    }

    .alert-box {
        ${mixins.flexCenter}
        border-radius: var(--border-radius);
        flex-direction: column;
        max-height: 600px;
        width: 500px;
        padding: 40px;
        background-color: var(--secondary-bg);
        -webkit-box-shadow: 0px 0px 40px 14px rgba(0,0,0,0.21); 
        box-shadow: 0px 0px 40px 14px rgba(0,0,0,0.21);
        ${props => (props.isVisible ? `opacity: 1;transform: scale(1);` : `opacity: 0.01;transform: scale(0.8);`)}
        transition: opacity 300ms cubic-bezier(0, 0.55, 0.45, 1), transform 300ms cubic-bezier(0, 0.55, 0.45, 1);

        @media(max-width: 768px){
            width: 80%;
        }

        .title {
            margin: 0;
            padding: 0;
        }

        .body-contents {
            ${mixins.flexCenter}
            align-items: flex-start;
            max-height: 300px;
            overflow: scroll;
            text-align: center;

            h1 {
                font-size: var(--f-xl);
            }
        }

        .buttons {
            ${mixins.flexCenter}

            .btn-cancel {
                font-family: var(--font-default);
                font-size: var(--f-sm);
                margin: 10px;
                padding: 9px 22px;
                outline: none;
                border: 2px solid var(--primary-accent);
                border-radius: 12px;
                background-color: transparent;
                color: var(--primary-accent);
                cursor: pointer;
                transition: var(--transition);
    
                &:hover{
                    background-color: rgba(160, 163, 189, 0.5);
                    border: 2px solid var(--primary-accent-hover);
                    transition: var(--transition);
                }
            }
            .btn-success {
                font-family: var(--font-default);
                font-size: var(--f-sm);
                width: 75px;
                margin: 10px;
                padding: 9px 22px;
                outline: none;
                border: none;
                border-radius: 12px;
                background-color: var(--primary-accent);
                color: var(--cf-white);
                cursor: pointer;
                transition: var(--transition);
    
                &:hover{
                    background-color: var(--primary-accent-hover);
                    transition: var(--transition);
                }
            }
        }
    }
`;

// declare const alertBoxTypes: readonly ["createTask", "editTask", "generalAlert"];
// export declare type alertBoxType = typeof alertBoxTypes[number];
/**
 * Create the parent for an alert (required)
 */
// export class AlertWrapper extends React.Component {
//     private alertParent: React.RefObject<HTMLDivElement>;
//     constructor(props){
//         super(props);
//         this.alertParent = React.createRef();
//     }
//     render() {
//         return <div ref={this.alertParent} />;
//     }
// }

/**
 * Display an AlertBox anywhere.
 * @param config Object
 * @param config.description String - The message to be displayed in the body of the alert box.
 * @param config.successBtnLabel String (optional) - Value of text in the success button.
 * @param config.cancelBtnLabel String (optional) - Value of text in the cancel button.
 * @param config.onSuccess Function (optional) - Function to execute when success button is clicked.
 * @param config.onCancel Function (optional) - Function to execute when cancel button is clicked.
 * @returns React JSX Element
 */

export default function AlertBox(config: { title?: string, description?: string, successBtnLabel?: string, cancelBtnLabel?: string, onSuccess?: () => void; onCancel?: () => void, props: any, onClickOutside: () => void }) {
    const ref = useRef();
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        setTimeout(() => {
            setIsVisible(true);
        }, ANIM);
    }, []);
    useOnClickOutside(ref, () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsMounted(false);
            config.onClickOutside();
        }, ANIM);
    });
    const callBack = (success?: boolean) => {
        setIsVisible(false);
        if (success) {
            if (config.onSuccess) {
                config.onSuccess();
            }
        } else {
            config.onCancel();
        }
        setTimeout(() => {
            setIsMounted(false);
        }, ANIM);
    };
    return (
        <StyledAlertBox isVisible={isVisible}>
            {isMounted ?
                <div ref={ref} className="alert-box">
                    <h1 className="title">{config.title}</h1>
                    <div className="line"></div>
                    <div className="body-contents">
                        {config.props}
                    </div>
                    <div className="buttons">
                        <button className="btn-cancel" onClick={() => callBack()}>{config?.cancelBtnLabel || "Cancel"}</button>
                        <button className="btn-success" onClick={() => callBack(true)}>{config?.successBtnLabel || "OK"}</button>
                    </div>
                </div> : ''}
        </StyledAlertBox>
    )

}