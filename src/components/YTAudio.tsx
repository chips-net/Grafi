import React from 'react';
import YouTube from 'react-youtube';

export default function YTAudio({url}){
    
    const opts = {
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 1,
          },
        };
        
    const onReady = (event) => {
        event.target.playVideo();
    }
    
    return <YouTube videoId={url} opts={opts} onReady={onReady} />
}