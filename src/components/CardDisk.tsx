import React from "react";
import style from './CardDisk.module.css'

export default function CardDisc({data,active}){
    return (
        <div className={style.CardGridContainer}>
          {data.music?.artwork?
          <div className={style.CardDiscContainer}>
          <div className={`${style.CardDiscImageContainer} ${active&&style.activeCD}`}>
            <img className={style.CardDiscImage} src={data.music.artwork}/>
            <div className={style.cdPin}></div>
          </div>
          </div>
          :null}
        </div>
        )
}