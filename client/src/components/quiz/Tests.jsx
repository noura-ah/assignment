import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteBtn from "../DeleteBtn"

const Tests = () => {
    const [tests, setTests] = React.useState([])
    const [isDeleted, setIsDeleted] = React.useState(false)

    React.useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/tests')
            .then(res => {
                setTests(res.data.tests)
                setIsDeleted(false)
            })
            .catch(err => console.log(err))
        
    }, [isDeleted])

    const handleDelete = (id) => {
        setTests(tests.filter(test => test.id != id))
        setIsDeleted(true)
    }

    return (
        <div className="container p-3">
            <Link className="btn btn-light" to="/tests/new">Add New test</Link>
            <table className="table  mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th># Questions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests && tests.map(test =>
                        <tr key={test.id}>
                            <td>{test.name}</td>
                            <td>{test.description}</td>
                            <td>{test.questions_count}</td>
                            <td>
                                <Link className="btn btn-light mx-1" to={l => `/tests/${test.id}/edit`}>Edit</Link>
                                <DeleteBtn id={test.id} handleDelete={() => handleDelete(test.id)}  />
                            </td>
                        </tr>
                    )}
                    {!tests && <tr>No tests</tr>}

                </tbody>
            </table>
        </div>
    )
}

export default Tests