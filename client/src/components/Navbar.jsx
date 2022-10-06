import { Link } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
    const handleClick = () => {
        axios.delete(`http://127.0.0.1:3000/api/logout`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/tests">Tests</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"  href="#" onClick={handleClick}>Logout</a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar