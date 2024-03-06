import React from "react";
import styles from './MusicPlayer.module.css'
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as PauseIcon } from "../assets/pause.svg";


export default function MusicPlayer({data}){
    return(
        <div className={styles.MusicPlayerContainer}>
            <div className={styles.CDPlayer}>
                <div className={styles.CDPlayer_CD}>
                    <img src={data?.artwork}/>
                    <div className={styles.CDPlayer_Pin}>
                </div>
                </div>
            </div>
            <div className={styles.CDPlayer_info}>
                <div className={styles.CDPlayer_title}>
                    {data?.title}
                </div>
                <div className={styles.CDPlayer_artist}>
                    {data?.artist}
                </div>
            </div>
            <div className={styles.CDPlayer_controll}>
                <PlayIcon width={25} height={25}/>
            </div>
        </div>
        )
}