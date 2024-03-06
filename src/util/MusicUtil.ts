import axios from 'axios'
import {acessToken,isValidToken} from './SpotifyAuth'

interface ITrackInfo{
  album:{images:[{url:string}]}
  name:string
  artists:[{name:string}]
}

export default class MusicUtil{
    static async searchMusic(keyword){
        const isTokenValid = await isValidToken()
        const res = await axios.get('https://api.spotify.com/v1/search', {
        params: {
             q: keyword,
             type: 'track',
             limit:'10'
        },
        headers: {
             Authorization: `Bearer ${acessToken}`,
          },
        });
        const trackInfo = res.data.tracks.items
        const result = trackInfo.map((e:ITrackInfo)=>{
          return {
          artwork:e.album.images[0].url,
          title:e.name,
          artist:e.artists[0].name
        }
        })
        return result
    }
}