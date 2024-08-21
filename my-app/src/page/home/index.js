import { useEffect, useState, useRef } from 'react'
import Edit from './components/Edit'
import List from './components/List'
import { API_DATA } from '../../global/constans'
import '../../index.css'

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

    
    return <div className='app'>
        <Edit addData={setData} updateState={updateState} />
        <List listData={data} updateData={setData} updateState={updateState} />
    </div>

}

export default Home