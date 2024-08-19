import { useState } from "react"
import {v4} from "uuid"

const Edit = ({addData,updateState}) =>{

    const [title , setTitle] = useState("")
    const titleChange = function(e){
        setTitle(e.target.value)
    }
    const [date , setDate] = useState("")
    const dateChange = function(e){
        setDate(e.target.value)
    }
    const [time , setTime] = useState("")
    const timeChange = function(e){
        setTime(e.target.value)
    }

    function addItem(){
        updateState.current=true //把更新資料的狀態改成True
        setTitle("")
        setDate("")
        setTime("")
        addData((prevData) =>{
            return [ {
                    id:v4(),
                    title,
                    date,
                    time,
                    isDone:false
                },...prevData
            ]  
        })
    }
    return <div>
        <h1>備忘錄</h1>
        <p>記事內容:</p>
        <input type="text" value={title} onChange={titleChange}></input>
        <p>日期:</p>
        <input type="date" value={date} onChange={dateChange}></input>
        <p>時間:</p>
        <input type="time" value={time} onChange={timeChange}></input>
        <br></br>
        <button className="add" onClick={addItem}>新增備忘錄</button>
    </div>
}

export default Edit