import React from "react";
import style from './CardList.module.css'

export default function CardList({data}){
    return (
        <div className={style.CardListContainer}>
          {data.image?
          <div className={style.CardListImageContainer}>
            <img className={style.CardListImage} src={data.image}/>
          </div>
          :null}
          {data.music?<div className={style.CardListMusicContainer}>
          <span>{data.music.title} - {data.music.artist}</span>
          </div>:null}
          <div>{data.content}</div>
        </div>
        )
}