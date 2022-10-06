import React from "react"
import axios from "axios"
import TestForm from './TestForm'
import { Link, useHistory, useParams } from 'react-router-dom'
import Errors from "../Errors"

const UpdateTest = () => {
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
    const { id } = useParams()
    const [isIdExist, setIsIdExist] = React.useState(true)
    const [questions, setQuestions] = React.useState([])



    React.useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/tests/${id}`)
            .then(res => {
                setTest(res.data.data.test)
                console.log(res.data)
                if (res.data.data.questions)
                    setQuestions(res.data.data.questions)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        setIsCreated(false)
        setTest({ ...test, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        test.questions_attributes = questions
        console.log(test, questions)
        axios.put(`http://127.0.0.1:3000/api/tests/${id}`, test)
            .then(res => {
                setIsCreated(true)
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

    console.log(test, questions, 'here')

    return (

        <div className="d-flex justify-content-center">
            <div className="card m-5 col-xl-10">
                <h3 className="card-header">Update Test</h3>
                <Errors msgs={errors} />
                <TestForm subject={test} questions={questions} setQuestions={setQuestions} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>

    )
}

export default UpdateTest