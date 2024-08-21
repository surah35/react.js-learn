import EditItem from "./EditItem"
import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import { FiMenu } from "react-icons/fi";

const Item = ({ title, date, time, updateData, id, updateState, isDone, isEditting,setdragClass }) => {

    function deleteItem() {
        updateState.current = true //把更新資料的狀態改成True
        updateData(function (prve) {
            return prve.filter(item => item.id !== id)
        })
    }
    function toggleDone() {
        updateState.current = true
        updateData(function (prve) {
            return prve.map(item => {
                if (item.id === id) {
                    return { ...item, isDone: !item.isDone }
                }
                else return item
            })
        })
    }

    function toggleEdit() {
        updateState.current = true
        updateData(function (prve) {
            return prve.map(item => {
                if (item.id === id) {
                    return { ...item, isEditting: !item.isEditting }
                }
                else return item
            })
        })
    }
    const {attributes,listeners, setNodeRef,transform,transition} = useSortable({id})
    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    }
    function changeClass(flag){
        setdragClass((flag)?"Dragging":"");
    }
    
    return (!isEditting) ?
        <div className="item" ref={setNodeRef}>
            <div className={`content ${isDone ? "done" : "none"}`} onClick={toggleDone} style={style} >
                <p className={(isDone) ? "title" : "none"}>{title}</p>
                <p>{date + '\t' + time}</p>
            </div>
            <div>
                <button className="edit" onClick={toggleEdit}  style={style}>編輯</button>
                <button className="remove" onClick={deleteItem}  style={style} >刪除</button>
            </div>
            <div className="drap" style={style} {...attributes}{...listeners} onMouseDown={()=>changeClass(true)} onMouseUp={()=>changeClass(false)} onMouseOut={()=>changeClass(false)}>
                <FiMenu size={15} />
            </div>
            
        </div> : <EditItem 
            updateData={updateData}
            id={id}
            updateState={updateState}
            title={title}
            date={date}
            time={time}
        />

}

export default Item