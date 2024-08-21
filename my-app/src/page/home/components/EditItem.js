import { useState } from "react"

const EditItem = ( {updateData ,id,updateState,title,date,time})=>{
    const [newtitle , setnewTitle] = useState((title === "無內容") ?"" :title )
    const titleChange = function(e){
        setnewTitle(e.target.value)
    }
    const [newdate , setnewDate] = useState((date === "無日期") ?"" :date)
    const dateChange = function(e){
        setnewDate(e.target.value)
    }
    const [newtime , setnewTime] = useState((time === "無時間") ?"" :time)
    const timeChange = function(e){
        setnewTime(e.target.value)
    }
    function noteChange(flag){
        updateState.current=true
        updateData(function(prve){
            return prve.map((item)=>{
                if(item.id === id ){
                    if(flag){
                        return {...item,
                        isEditting:!item.isEditting,
                        time:newtime,
                        date:newdate,
                        title:newtitle
                        }
                    }
                    else return { 
                            ...item,
                            isEditting:!item.isEditting,
                            
                        }
                     
                    
                }
                else return item
            })
        })
    }

    return <div className="edit_item">
        <p>記事內容:</p>
        <input type="text" value={newtitle} onChange={titleChange}></input>
        <p>日期:</p>
        <input type="date" value={newdate} onChange={dateChange}></input>
        <p>時間:</p>
        <input type="time" value={newtime} onChange={timeChange}></input>
        <br></br>
        <button className="edit_done" onClick={()=>noteChange(true)}>完成編輯</button>
        <button className="edit_cancel" onClick={()=>noteChange(false)}>取消編輯</button>
    </div>
}

export default EditItem