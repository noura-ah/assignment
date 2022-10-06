import DeleteBtnQA from "./DeleteBtnQA"
import React from "react"
import axios from 'axios'

const Question = (props) => {
    const { id, subject, handleChange, handleDelete } = props
    
    
    
    return (
        <div className="card-header">
            <div className="d-flex align-items-center mb-3">
                <label className="label-control d-flex me-3">Q <span>{id+1}</span>:</label>
                <input className="form-control" id={id} value={subject.label} name="label" onChange={handleChange} placeholder="Give the question a label" />
                <DeleteBtnQA id={id} handleDelete={() => handleDelete(id,"question")} />
            </div>
            <textarea className="form-control" id={id} value={subject.description} name="description" onChange={handleChange} placeholder="Enter a description" />
        </div>
    )
}
export default Question