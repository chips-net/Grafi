import React,{useState,useEffect} from "react";
import styles from './MusicSearch.module.css'
import MusicUtil from '../util/MusicUtil'


export default function MusicSearch({isOpen,setOpen,setMusic}){
    const [keyword,setKeyWord] = useState('')
    const [view,setView] = useState([]) 
    const onChange=(e)=>{
        setKeyWord(e.target.value)
    }
    const handleSearch=async (e)=>{
        if(e.key === 'Enter') {
            document.querySelector('input').blur()
            const finder = await MusicUtil.searchMusic(keyword)
            setView(finder)
        }
    }
    
    
    return(
         <div className={`${styles.ModalContainer} ${isOpen?styles.open:styles.close}`} onClick={()=>setOpen(false)}>
            <div className={styles.modalBody} onClick={e => e.stopPropagation()} >
                <input type='search' value={keyword} onChange={onChange} onKeyPress={handleSearch}/>
                {
                    view.map(e=>
                        <div className={styles.cdWrap} onClick={()=>{setMusic(e);setOpen(false)}}>
                            <div className={styles.cd}><img src={e.artwork}/><div className={styles.cdHole}></div></div>
                            <div className={styles.title}>{e.title}</div>
                            <div className={styles.artist}>{e.artist}</div>
                        </div>
                    )
                }
            </div>
        </div>
        )
}