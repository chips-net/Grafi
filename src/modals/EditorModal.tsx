import React,{useState} from "react";
import styles from './EditorModal.module.css'
import Modal from "../components/Modal";
import MusicSearch from "../components/MusicSearch";
import { ReactComponent as Submit } from "../assets/paper-plane.svg";
import axios from 'axios'


export default function EditorModal({isOpen,setOpen}){
    const [searchMusic,setSearchMusic] = useState(false) 
    const [music,setMusic] = useState(null) 
    const [content,setContent] = useState('')
    const [imgFile,setImgFile] = useState(null) 
    
    
    
    
    const handleSubmit=async()=>{
        const formData = new FormData();
        formData.append('content',content)
        formData.append('music',JSON.stringify(music))
        formData.append('imgFile',imgFile)
        formData.append('date',String(new Date()))
        
        const res = axios({
            method: 'POST',
            url: '/api/write',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(function (res) {
                console.log(res);
                console.log(formData)
          }).catch(function (e) {
                console.log(e);
          });

    }
    return(
        <Modal isOpen={isOpen} setOpen={setOpen}>
            <MusicSearch isOpen={searchMusic} setOpen={setSearchMusic} setMusic={setMusic}/>
            <div className={styles.header}>
                <div onClick={()=>setOpen(false)} style={{display:'inline'}}>&lt;</div>
                <div style={{float:'right'}}><Submit width={35} height={35} onClick={handleSubmit}/></div>
            </div>
            <div className={styles.mediaEditorContainer}>
                <div className={styles.editorPhoto}>
                    <label htmlFor='imgFile'>
                    <div className={styles.imgWrap}>{imgFile?<img src={URL.createObjectURL(imgFile)}/>:null}</div>
                    </label>
                </div>
                <div className={styles.editorMusic}>
                    <div className={styles.cd} onClick={()=>setSearchMusic(!searchMusic)}>
                        <div className={styles.cdContent}>{music?.artwork?<img src={music.artwork}/>:null}</div>
                        <div className={styles.cdPin}></div>
                    </div>
                </div>
            </div>
            <div className={styles.editor}>
              <textarea className={styles.editInput} placeholder='지금 떠오르는 것은......' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <input id='imgFile' type='file' onChange={(e)=>setImgFile(e.target.files[0])}/>
        </Modal>
        )
}