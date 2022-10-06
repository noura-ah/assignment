import React from "react"
import axios from "axios"
import Form from './Form'
import { useHistory } from 'react-router-dom'
import Errors from "../Errors"

const NewUser = () => {
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'teacher',
    })
    const [isCreated, setIsCreated] = React.useState(false)
    const [errors, setErrors] = React.useState([]);
    const history = useHistory()


    const handleChange = (e) => {
        setIsCreated(false)
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://127.0.0.1:3000/api/users`, user)
            .then(res => {
                setIsCreated(true)
                history.push('/users')
            })
            .catch(err => {
                console.log(err)
                const data = err.response.data;
                const errorMessages = [];
                if ("errors" in data) {
                    for (let field in data.errors) {
                        const validationError = data.errors[field];
                        errorMessages.push(field+" "+validationError);
                    }
                }
                setErrors(errorMessages);
            })

    }
    return (

        <div className="d-flex justify-content-center align-items-center flex-column">
            <h3 className="mt-5">Add a new User</h3>
            <Errors msgs={errors}/>
            <Form subject={user} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>

    )
}

export default NewUser