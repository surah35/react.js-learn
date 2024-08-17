const Edit = ({addData}) =>{

    function addItem(){
        addData([2,4,5,7])
    }

    return <div>
        <h1>備忘錄</h1>
        <p>標題:</p>
        <input type="text"></input>
        <p>日期:</p>
        <input type="date"></input>
        <p>時間:</p>
        <input type="time"></input>
        <br></br>
        <button className="add" onClick={addItem}>新增備忘錄</button>
    </div>
}

export default Edit