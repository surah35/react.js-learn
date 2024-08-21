import { useState} from "react"
import Item from "./Item"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"

const List = ({listData,updateData,updateState}) =>{
    
    const [dragClass ,setdragClass ]= useState("")
    console.log(dragClass);
    
    return <div className={`list ${dragClass}`} >
        <SortableContext items={listData} strategy={verticalListSortingStrategy}>
            {
            listData.map((item)=>{
                console.log(item)
                let {title,date,time,id,isDone,isEditting} = item
                if(title==='') title = '無內容'
                if(date==='') date = '無日期'
                if(time==='') time = '無時間'
                return <Item 
                    key={id} 
                    id ={id}
                    title={title} 
                    date={date} 
                    time={time} 
                    isDone={isDone}
                    isEditting={isEditting}
                    updateData={updateData}
                    updateState={updateState}
                    setdragClass={setdragClass}
                />
            })}
        </SortableContext>
        
    </div>
}

export default List