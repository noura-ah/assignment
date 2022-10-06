import React from "react"
import axios from "axios"
import Form from './Form'
import { useHistory, useParams } from 'react-router-dom'
import Errors from "../Errors"

const UpdateUser = () => {
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    })
    const [isCreated, setIsCreated] = React.useState(false)
    const [errors, setErrors] = React.useState([]);
    const history = useHistory()
    const { id } = useParams()
    const [isIdExist, setIsIdExist] = React.useState(true)

    React.useEffect(() => {

        axios.get(`http://127.0.0.1:3000/api/users/${id}`)
            .then(res => setUser(res.data))
            .catch(err => setIsIdExist(false))
    }, [])

    const handleChange = (e) => {
        setIsCreated(false)
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://127.0.0.1:3000/api/users/${id}`, user)
            .then(res => {
                setIsCreated(true)
                history.push('/users')
            })
            .catch(err => {
                const data = err.response.data;
                const errorMessages = [];
                if ("errors" in data) {
                    for (let field in data.errors) {
                        const validationError = data.errors[field];
                        errorMessages.push(field + " " + validationError);
                    }
                }
                setErrors(errorMessages);
            })


    }
    console.log(errors)
    return (
        <div className="d-flex justify-content-center">
            <div className="card m-5 col-xl-6">
                <h3 className="card-header">Edit this user</h3>
                <Errors msgs={errors} />
                <Form subject={user} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default UpdateUser