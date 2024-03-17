import React,{useState} from "react";
import styles from './SettingModal.module.css'
import Modal from "../components/Modal";
import {useTheme} from '../context/themeProvider'
import styled from 'styled-components';

const SwitchBtn = styled.div`
	box-shadow: ${({theme})=>theme.boxShade};
`



export default function EditorModal({isOpen,setOpen}){
    const [isDarkMode,setDarkMode] = useState(false)
    const [ThemeMode, toggleTheme] = useTheme();
    
    const handleDarkMode = (state) => {
        if(state==true){
            setDarkMode(state)
            toggleTheme('dark')
        }else{
            setDarkMode(state)
            toggleTheme('light')
        }
    }
    
    return(
        <Modal isOpen={isOpen} setOpen={setOpen}>
            <div className={styles.header}>
                <div onClick={()=>setOpen(false)} style={{display:'inline'}}>&lt;</div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.settingMenu}>다크모드
                </div>
            </div>
             <SwitchBtn className={styles.switchOutline} onClick={()=>handleDarkMode(!isDarkMode)}>
                    <div className={`${styles.switchInline} ${isDarkMode&&styles.switchInlineOn} `}>
                        <div className={`${styles.switchSlide} ${isDarkMode&&styles.switchSlideOn}`}></div>
                    </div>
                </SwitchBtn>
        </Modal>
        )
}