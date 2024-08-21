import { useEffect, useState, useRef } from 'react'
import Edit from './components/Edit'
import List from './components/List'
import { API_DATA } from '../../global/constans'
import '../../index.css'
import {DndContext,closestCorners, useSensor,PointerSensor,TouchSensor,KeyboardSensor} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

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
    const sensors = useSensor(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),{
            coordinateGetter:sortableKeyboardCoordinates,
        }
    )
    
    return <div className='app'>
        <Edit addData={setData} updateState={updateState} sensors={sensors}/>
        <DndContext collisionDetect={closestCorners} onDragEnd={handleDragEnd}>
            <List listData={data} updateData={setData} updateState={updateState} />
        </DndContext>
       
    </div>

}

export default Home