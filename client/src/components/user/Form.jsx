import { Link } from "react-router-dom"
const Form = (props) => {
    const { subject, handleChange, handleSubmit, value } = props

    return (
        <form className="form card-body px-5" onSubmit={handleSubmit}>
            <div className="px-5 mt-4">
                <label className="form-label">Name:</label>
                <input className="form-control" value={subject.name} name="name" onChange={handleChange} />
            </div>
            <div className="px-5 mt-4">
                <label className="form-label">Email:</label>
                <input className="form-control" value={subject.email} name="email" onChange={handleChange} />
            </div>
            <div className="px-5 mt-4">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" value={subject.password} name="password" onChange={handleChange} />
            </div>
            <div className="px-5 mt-4">
                <label className="form-label">Password Confirmation:</label>
                <input type="password" className="form-control" value={subject.password_confirmation} name="password_confirmation" onChange={handleChange} />
            </div>
            <div className="px-5 mt-4">
                <label className="form-label">Role:</label>
                <select className="form-control" value={subject.role} name="role" onChange={handleChange}>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <input className="btn btn-light m-3" value={value} type="submit" />
                <Link className="btn btn-light " to="/users">Back</Link>
            </div>
        </form>
    )
}

export default Form