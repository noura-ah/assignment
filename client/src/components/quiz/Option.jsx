import DeleteBtnQA from "./DeleteBtnQA"

const Option = (props) => {
    const {id_Q, id, subject, handleChange, handleDelete } = props

    
    return (
        // <div className="mt-4">
            <div className="d-flex align-items-center">
                <input className="form-control" id={id} value={subject.choice} name="choice" onChange={handleChange} placeholder="Enter Choice" />
                <DeleteBtnQA id={id}  handleDelete={() => handleDelete(id,"option",id_Q)} />
            </div>
        // </div>
    )
}
export default Option