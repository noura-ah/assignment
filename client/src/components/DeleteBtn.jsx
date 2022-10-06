import axios from "axios"

const DeleteBtn = (props) => {
    const handleClick = () => {
        axios.delete(`http://127.0.0.1:3000/api/tests/${props.id}`)
            .then( props.handleDelete(props.id))
            .catch( err => console.log(err))
    }
    return (
        <input type="button" className="btn btn-light" value="Delete" onClick={handleClick}/>
    )
}

export default DeleteBtn