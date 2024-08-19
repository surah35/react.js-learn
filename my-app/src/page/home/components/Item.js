const Item  = ({title, date ,time,updateData,id,updateState,isDone}) =>{

    function deleteItem(){
        updateState.current=true //把更新資料的狀態改成True
        updateData(function(prve) {
            return prve.filter(item=>item.id !== id)
        })
    }
    function toggleDone(){
        updateState.current=true
        updateData(function(prve) {
            return prve.map(item=>{
                if(item.id === id){
                    return {...item,isDone:!item.isDone}
                }
                else return item
            })
        })
    }

    return <div className="item">
        <div className={`content ${isDone?"done":"none"}`} onClick={toggleDone}>
            <p className={(isDone)?"title":"none"}>{title}</p>
            <p>{date+'\t'+time}</p>
        </div>
        <div>
            <button className="edit" >編輯</button>
            <button className="remove" onClick={deleteItem}>刪除</button>
        </div>
        
    </div>
}

export default Item