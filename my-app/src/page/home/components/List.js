import Item from "./Item"

const List = ({listData,updateData,updateState}) =>{
    
    return <div className="list">
        {
            listData.map((item)=>{
                console.log(item)
                let {title,date,time,id,isDone} = item
                if(title==='') title = '無標題'
                if(date==='') date = '無日期'
                if(time==='') time = '無時間'
                return <Item 
                    key={id} 
                    id ={id}
                    title={title} 
                    date={date} 
                    time={time} 
                    isDone={isDone}
                    updateData={updateData}
                    updateState={updateState}
                />
            })
        }
        
    </div>
}

export default List