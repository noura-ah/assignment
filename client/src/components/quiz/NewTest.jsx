import React from "react"
import axios from "axios"
import TestForm from './TestForm'
import { Link, useHistory } from 'react-router-dom'
import Errors from "../Errors"

const NewTest = () => {
    const [test, setTest] = React.useState({
        name: "",
        description: '',
        questions_attributes: [
            {
                label: "",
                description: '',
                correct_ans: '',
                answers_attributes: [
                    {
                        choice: ''
                    }
                ]
            }
        ],
    })
    const [isCreated, setIsCreated] = React.useState(false)
    const [errors, setErrors] = React.useState([]);
    const history = useHistory()

    const [questions, setQuestions] = React.useState([{
        label: "",
        description: '',
        correct_ans: '',
        answers_attributes: [{
            choice: ''
        }]

    }])


    const handleChange = (e) => {
        setIsCreated(false)
        const { name, value } = e.target
        setTest({ ...test, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        test.questions_attributes = questions
        axios.post(`http://127.0.0.1:3000/api/tests`, test)
            .then(res => {
                setIsCreated(true)
                console.log(res)
                history.push('/tests')
            })
            .catch(err => {
                console.log(err)
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
    
    return (

        <div className="d-flex justify-content-center align-items-center flex-column">
            <h3 className="mt-5">Add a new Test</h3>
            <Errors msgs={errors} />
            <TestForm subject={test} questions={questions} setQuestions={setQuestions} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>

    )
}

export default NewTest