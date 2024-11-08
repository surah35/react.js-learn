import { FiChevronsDown } from "react-icons/fi";
import "../CSS/HideEdit.css"

const HideEditDown = ({sethideState,hideState,setisExpanded,isExpanded})=>{
    function hide_edit(){
        setisExpanded(!isExpanded);
        setTimeout(() => {
            sethideState(!hideState);
        }, 1100);
    }
    return <div className="hide_edit" onClick={hide_edit}>
        <FiChevronsDown></FiChevronsDown>
    </div>
}

export default HideEditDown