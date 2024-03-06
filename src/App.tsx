import React,{useState,useEffect,useRef} from "react";
import ReactDOM from "react-dom";
import CardList from './components/CardList'
import CardGrid from './components/CardGrid'
import CardDisk from './components/CardDisk'
import MusicPlayer from './components/MusicPlayer'
import EditorModal from './modals/EditorModal'
import axios from 'axios'
import './App.css'
import { ReactComponent as ListIcon } from "./assets/list.svg";
import { ReactComponent as DiscIcon } from "./assets/disc.svg";
import { ReactComponent as GridIcon } from "./assets/grid.svg";
import Masonry from "react-responsive-masonry"

function App(){
    const [viewType,setViewType] = useState(1) 
    const [editorOpen,setEditorOpen] = useState(false)
    const [audio,setAudio] = useState({artwork:'https://i.scdn.co/image/ab67616d0000b273f538596da78b3e822f05bf53',title:'김철수씨 이야기',artist:'허회경'}) 
    const [audioSource,setSource] = useState(null)
    const [selected,setSelected] = useState(null)
    const [view,setView] = useState([]) 
    const audioRef = useRef()
    
    const prSetSource = (src) => {
        return new Promise(function (resolve, reject) {
          setSource(src)
          resolve(src); 
        })
    }
    
    const handleSelectedAudio=(i,audioData)=>{
        setSelected(null)
        setAudio(audioData)
        prSetSource('/cdPlayer.mp3')
        .then(result=>{
                audioRef.current.play()
        })
        axios.get(`/api/audio?title=${audioData?.title}&artist=${audioData?.artist}`)
        .then(res=>{
            prSetSource(res.data.url)
            .then(result=>{
                audioRef.current.play()
                setSelected(i)
            })
        })
    }
    
    const [offset,setOffset] = useState(0)
    useEffect((e)=>{
        try{
            axios.get(`/api/row/${offset}`)
            .then((res)=>{
                setView(res.data)
            })
        }catch(e){
            
        }
    },[offset])
  return (
      <>
      <EditorModal isOpen={editorOpen} setOpen={setEditorOpen}/>
      <div className='write_btn' onClick={()=>setEditorOpen(true)}>
        <div></div>
      </div>
      <div className='setMode_btn'>
        <div></div>
      </div>
      <div className='header'>
      <div onClick={()=>setViewType(1)} className='header_item'><GridIcon width={30} height={30} fill='#292626'/></div>
        <div className='header_item' onClick={()=>setViewType(0)}><ListIcon width={30} height={30} fill='#292626'/></div>
        <div className='header_item' onClick={()=>setViewType(2)}><DiscIcon width={30} height={30} fill='#292626'/></div>
        <MusicPlayer data={audio}/>
      </div>
      <audio src={audioSource} ref={audioRef}/>
      
      
      {
          viewType==0?
          <div>
            {
                view.map(e=>
                  <span onClick={()=>setAudio(e.music)}><CardList data={e}/></span>
                )
            }
          </div>
      :viewType==1?<div className='CardGridWrap'>
            <Masonry columnsCount={2} className='CardGridWrap'>
            {
                view.map(e=>
                  <span><CardGrid data={e}/></span>
                
                )
            }
      </Masonry>
          </div>
      :<div style={{width:'40rem',margin:'0 auto'}} className='CardDiscWrap'>
            {
                view.map((e,i)=>
                  e.music?<span onClick={()=>handleSelectedAudio(i,e.music)}><CardDisk data={e} active={selected==i?true:false}/></span>:null
                )
            }
       </div>}
      </>
    )
};

export default App