const Errors = (props) => {
    const { msgs } = props
    return (
        <div>
            {msgs.map(msg=> 
                <div className="alert alert-danger" key={msg}>{msg}</div>)}
        </div>
    )
}
export default Errors