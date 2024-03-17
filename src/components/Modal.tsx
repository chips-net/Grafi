import React,{ReactNode} from "react";
import styles from './Modal.module.css'
import styled from 'styled-components';
const ModalContainer = styled.div`
	background:${({theme})=>theme.bgColor};
	transition: background 0.1s;
`
interface ModalProps{
    isOpen:boolean
    setOpen:Function
    children?:ReactNode
}
export default function Modal({isOpen,setOpen,children}:ModalProps){
    
    return(
        <ModalContainer className={`${styles.ModalContainer} ${isOpen?styles.open:styles.close}`}>
        <div className={styles.modalBody}>
            {children}
        </div>
        </ModalContainer>
        )
}