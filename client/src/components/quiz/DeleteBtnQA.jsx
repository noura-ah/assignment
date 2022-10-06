import axios from "axios"

const DeleteBtnQA = (props) => {
    const handleClick = (e) => {
        e.preventDefault();
        props.handleDelete(props.id)
    }
    return (
        <input type="button" className="btn btn-light" value="Delete" onClick={handleClick}/>
    )
}

export default DeleteBtnQA