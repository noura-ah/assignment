import React from "react"
import axios from "axios"
import { Link, useHistory, useParams } from 'react-router-dom'
import DeleteBtn from "../DeleteBtn"

const ShowUser = () => {
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    })
    const { id } = useParams()
    const [isIdExist, setIsIdExist] = React.useState(false)
    const history = useHistory()




    React.useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/users/${id}`)
            .then(res => {
                setUser(res.data)
                setIsIdExist(true)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        history.push('/users')
    }

    return (<>

        {isIdExist && <div className="container mt-5">
            <div className="mb-5">
                <Link className="btn btn-light " to="/users">Back</Link>
                <Link className="btn btn-light mx-3" to={l => `/users/${id}/edit`}>Edit</Link>
                <DeleteBtn id={id} handleDelete={() => handleDelete(id)} />
            </div>
            <p>Email: {user.email}</p>
            <p>Password: {isIdExist && "*".repeat(8)}</p>
            <p>Role: {user.role}</p>
        </div>}
        {!isIdExist && <div className="container mt-5"> No user exist</div>}
    </>
    )
}
export default ShowUser