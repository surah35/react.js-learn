import { FiChevronsUp } from "react-icons/fi";
import "../CSS/HideEdit.css"

const HideEditUp = ({sethideState,hideState,setisExpanded,isExpanded})=>{
    function hide_edit(){
        setisExpanded(!isExpanded);
        sethideState(!hideState);
        
    }
    return <div className="hide_edit" onClick={hide_edit}>
        <FiChevronsUp />
    </div>
}

export default HideEditUp