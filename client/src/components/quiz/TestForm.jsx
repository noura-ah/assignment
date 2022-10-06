import { Link } from "react-router-dom"
import React from "react"
import Question from "./Question"
import DeleteBtn from "../DeleteBtn"
import Option from "./Option"
import axios from 'axios'

const TestForm = (props) => {
    const { subject, questions, setQuestions,
        handleChange, handleSubmit, value } = props

    const addQuestion = (e) => {
        e.preventDefault();
        setQuestions(s => {
            return [
                ...s,
                {
                    label: "",
                    description: '',
                    correct_ans: '',
                    answers_attributes: [{
                        choice: ''
                    }]
                }
            ];
        });
    };

    const addOption = (e) => {
        e.preventDefault();
        const index = e.target.id;
        setQuestions(s => {
            const newArr = s.slice();
            console.log(newArr[index],'here',index,newArr[index].answers_attributes)
            newArr[index].answers_attributes=[...newArr[index].answers_attributes,{choice:''}]

            return newArr;
        });

    };


    const handleDelete = (id, name, id_Q) => {
        if (name == "question") {
            setQuestions(questions.filter((a,index) => index != id))
        }
        else {
            setQuestions(s => {
                const newArr = s.slice();
                newArr[id_Q].answers_attributes= newArr[id_Q].answers_attributes.filter((a,index) => index != id);
                return newArr
            });
        }
    }

    const handleChangeQ = e => {
        e.preventDefault();

        const index = e.target.id;
        setQuestions(s => {
            const newArr = s.slice();
            if (e.target.name.includes('correct_ans'))
                e.target.name = "correct_ans"
            newArr[index][e.target.name] = e.target.value;

            return newArr;
        });
    };

    const handleChangeOptions = (e, i) => {
        e.preventDefault();
        
        const index = e.target.id;
        const indexQ = i;
        setQuestions(s => {
            const newArr = s.slice();
            newArr[indexQ].answers_attributes[index].choice = e.target.value
            return newArr;
        });
    };
    return (<>

        <form id="form1" className="form container px-5" onSubmit={handleSubmit}>
            <div className="d-flex align-items-center px-5 mt-4">
                <label className="form-label">Name*:</label>
                <input className="form-control" value={subject.name} name="name" onChange={handleChange} />
            </div>
            <div className="d-flex align-items-center px-5 mt-4">
                <label className="form-label">Description:</label>
                <input className="form-control" value={subject.description} name="description" onChange={handleChange} />
            </div>
            <hr />
            {questions.map((item, i) => {
                return (
                    <div key={i} className="px-5 mt-4">
                        <Question subject={item} id={i} handleChange={handleChangeQ} handleDelete={handleDelete} />

                        {item.answers_attributes && item.answers_attributes.map((op, i_answers) => {
                            return (
                                <div key={i_answers} className="px-5 mt-4 d-flex align-items-center ">
                                    <Option subject={op} id={i_answers} id_Q={i} handleChange={(e) => handleChangeOptions(e, i)} handleDelete={handleDelete} />
                                    <div className="form-check mx-3">
                                        <label className="form-check-label">Correct answer</label>
                                        <input id={i} className="form-check-input" checked={item.correct_ans == op.choice} name={`correct_ans_${i}`} onChange={handleChangeQ} value={op.choice} type="radio" />
                                    </div>
                                </div>
                            )
                        })}

                        <button type="button" id={i} className="btn btn-light m-1" onClick={addOption}>Add Option</button>
                    </div>
                );
            })}

            <div className="d-flex align-items-center justify-content-center mt-3">
                <input form="form1" className="btn btn-light m-1" value={value} type="submit" />
                <Link className="btn btn-light m-1" to="/tests">Back</Link>
                <button type="button" className="btn btn-light m-1" onClick={addQuestion}>Add Question</button>
            </div>

        </form>


    </>
    )
}

export default TestForm