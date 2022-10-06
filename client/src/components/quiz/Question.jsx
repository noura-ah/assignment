import DeleteBtnQA from "./DeleteBtnQA"
import React from "react"
import axios from 'axios'

const Question = (props) => {
    const { id, subject, handleChange, handleDelete } = props
    
    
    
    return (
        <div className="mt-4">
            <div className="d-flex mb-3">
                <input className="form-control" id={id} value={subject.label} name="label" onChange={handleChange} placeholder="Give the question a label" />
                <DeleteBtnQA id={id} handleDelete={() => handleDelete(id,"question")} />
            </div>
            <input className="form-control" id={id} value={subject.description} name="description" onChange={handleChange} placeholder="Enter a description" />
        </div>
    )
}
export default Question