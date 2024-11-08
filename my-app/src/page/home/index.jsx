import { useEffect, useState, useRef } from 'react'
import Edit from './components/scripes/Edit'
import List from './components/scripes/List'
import { API_DATA } from '../../global/constans'
import '../../index.css'
import {DndContext,closestCorners, useSensor,useSensors,PointerSensor,TouchSensor} from "@dnd-kit/core"
import { arrayMove, } from '@dnd-kit/sortable'
import HideEditUp from './components/scripes/HideEditUp'
import HideEditDown from './components/scripes/HideEditDown'

async function fetchDB(setData) {
    const res = await fetch(API_DATA)
    const { data } = await res.json()
    setData(data)
}
async function updateDB(data) {
    await fetch(API_DATA, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ data })
    })
}

const Home = () => {

    const [data, setData] = useState([]);
    const [hideState,sethideState] = useState(false)
    const [isExpanded,setisExpanded] = useState(false)
    const updateState = useRef(false);
    //當data改變時 載入裡面的function
    useEffect(() => {
        if (!updateState.current) return;
        updateDB(data)    //更新db.json的資料
            .then(data => updateState.current = false) //把資料更新完的狀態改成False
    }, [data])

    //只執行一次 因為沒有可監聽變數 只會在reset時載入
    useEffect(() => {
        fetchDB(setData) //抓取db.json的資料
    }, [])

    const getItemPos = (id)=> data.findIndex((item)=> item.id === id);
    
    const handleDragEnd = (event) =>{
        try {
            const {active,over} = event;
            
            if(active.id === over.id) return;
            setData((datas)=>{
                updateState.current = true
                const oriPos = getItemPos(active.id);
                const newPos = getItemPos(over.id);
                return arrayMove(datas,oriPos,newPos);
                
            })
        } catch (error) {
            alert('不可拖移到此處');
        }  
    }
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
    )
    
    return <div className='app'>
        <h1>備忘錄</h1>
        <div className={`editArea ${isExpanded?"Expanded":""}`}>
            {(hideState)?<></>:<Edit addData={setData} updateState={updateState} />}
        </div>
        <div>
            {(!hideState)?<></>:<HideEditDown sethideState={sethideState} hideState={hideState} setisExpanded={setisExpanded} isExpanded={isExpanded}/>}
            {(hideState)?<></>:<HideEditUp sethideState={sethideState} hideState={hideState}setisExpanded={setisExpanded} isExpanded={isExpanded}/>}
        </div>
        <DndContext collisionDetect={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            <List listData={data} updateData={setData} updateState={updateState}/>
        </DndContext>
    </div>

}

export default Home