import React from "react";
import style from './CardGrid.module.css'

export default function CardGrid({data}){
    return (
        <div className={style.CardGridContainer}>
          {data.image?
          <div className={style.CardGridImageContainer}>
            <img className={style.CardGridImage} src={data.image}/>
          </div>
          :null}
          <div className={style.CardGridDescriptContainer}>
              {data.music?<div className={style.CardGridMusicContainer}>
              <span>{data.music.title} - {data.music.artist}</span>
              </div>:null}
              <div>{data.content}</div>
          </div>
        </div>
        )
}