import axios from 'axios'
import moment from 'moment'

const CLIENTID = '8beaeb94ca364ed19f86036cc9e63434'
const CLIENTSECRET = '89292a565c3a4dad8db550ca78970d3e'
const AUTH = Buffer.from(`${CLIENTID}:${CLIENTSECRET}`).toString('base64');



let acessToken:string;
let expire:any

async function isValidToken(){
  const present = moment();
  const isExpire = expire?.isBefore(present);
  if(isExpire || !expire) {
    const refresh = await getToken();
    acessToken = refresh.token
    expire = refresh.expire
    return 'it is inValid so refreshed'
  }else return 'it is valid'
}
async function getToken(){
    try {
    const res = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          Authorization: 'Basic ' + AUTH,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const newExpire = moment().add(1, "hours");
      acessToken=res.data.access_token
      expire=newExpire
      return {token:res.data.access_token,expire:expire}
   } catch (e) {
     throw e
   }
}


export {acessToken}
export {isValidToken}