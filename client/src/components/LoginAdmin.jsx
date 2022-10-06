import React from "react"
import axios from "axios"
import { Link, useHistory, useParams } from 'react-router-dom'
import Errors from "./Errors"


const LoginAdmin = () => {
    const [userLogin, setUserLogin] = React.useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = React.useState([]);
    const history = useHistory()

    const handleChangeLogin = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(`http://127.0.0.1:3000/api/sign_in`, userLogin)
            .then(res => {
                history.push('/users')
            })
            .catch(err => {
                console.log(err)
                const data = err.response.data;
                const errorMessages = [];

                if (!err?.response) {
                    errorMessages.push("No Server Response");
                } else if (err.response?.status === 400) {
                    errorMessages.push("Wrong Email or Password");
                } else if (err.response?.status === 403) {
                    errorMessages.push("Only teacher allowed to login");
                } else {
                    errorMessages.push("Login Failed");
                }
                setErrors(errorMessages);
            })

    };
    return (
        <div className="container mt-5">
            <Errors msgs={errors} />
            <div className="card">
                <h5 className="card-header">Adminstrator Login</h5>

                <form onSubmit={handleLogin} className="p-4 border-dark sign-in-htm">
                    <div className="mb-3">
                        <label name="email" className="form-label">email:</label>
                        <input name="email" value={userLogin.email} className="form-control" onChange={handleChangeLogin} />
                    </div>
                    <div className="mb-3">
                        <label name="password" className="form-label">Password: </label>
                        <input name="password" value={userLogin.password} type="password" className="form-control" onChange={handleChangeLogin} />
                    </div>
                    <input type="submit" value="Login" className="btn btn-dark" style={{ backgroundColor: "#603F8B" }} />
                </form>
            </div>
        </div>

    )

}
export default LoginAdmin