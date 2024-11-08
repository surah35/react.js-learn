import EditItem from "./EditItem"
import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import { FiMenu } from "react-icons/fi";
import "../CSS/Item.css"

const Item = ({ title, date, time, updateData, id, updateState, isDone, isEditting,setdragClass,dragClass }) => {

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
    const {attributes,listeners, setNodeRef,transform,transition,isSorting} = useSortable({id})
    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    }
    
    if(isSorting) setdragClass("Dragging");
    else setdragClass("");  
    
    return (!isEditting) ?
        <div className={`item `} id={`${dragClass}`} ref={setNodeRef} style={style} >
            <div className={`content ${isDone ? "done" : "none"}`} onClick={toggleDone} >
                <p className={(isDone) ? "title" : "none"}>{title}</p>
                <p>{date + '\t' + time}</p>
            </div>
            <div>
                <button className="edit_btn" onClick={toggleEdit}  >編輯</button>
                <button className="remove_btn" onClick={deleteItem}  >刪除</button>
            </div>
            <div className="drap"  {...attributes}{...listeners}>
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