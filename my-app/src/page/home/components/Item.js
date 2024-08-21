import EditItem from "./EditItem"

const Item = ({ title, date, time, updateData, id, updateState, isDone, isEditting }) => {

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

    return (!isEditting) ?
        <div className="item">
            <div className={`content ${isDone ? "done" : "none"}`} onClick={toggleDone}>
                <p className={(isDone) ? "title" : "none"}>{title}</p>
                <p>{date + '\t' + time}</p>
            </div>
            <div>
                <button className="edit" onClick={toggleEdit}>編輯</button>
                <button className="remove" onClick={deleteItem}>刪除</button>
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