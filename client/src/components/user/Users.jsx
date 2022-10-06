import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteBtn from "../DeleteBtn"

const Users = () => {
    const [users, setUsers] = React.useState([])
    const [isDeleted, setIsDeleted] = React.useState(false)

    React.useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/users')
            .then(res => {
                setUsers(res.data.users)
                setIsDeleted(false)
            })
            .catch(err => console.log(err))

    }, [isDeleted])

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id != id))
        setIsDeleted(true)
    }
    return (
        <div className="container p-3">
            <Link className="btn btn-light" to="/users/new">Add New user</Link>
            <table className="table  mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(u =>
                        <tr key={u.id}>
                            <td><Link to={l => `users/${u.id}`}>{u.name}</Link></td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <Link className="btn btn-light mx-1" to={l => `/users/${u.id}/edit`}>Edit</Link>
                                <DeleteBtn id={u.id} handleDelete={() => handleDelete(u.id)} url={`http://127.0.0.1:3000/api/users/${u.id}`} />
                            </td>
                        </tr>
                    )}
                    {!users && <tr>No users</tr>}

                </tbody>
            </table>
        </div>
    )
}

export default Users