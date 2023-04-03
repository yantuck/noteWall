import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const Create = () => {

    //setting variables to useable data
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [boolean, setBoolean] = useState(false)

    //allowing use of errors
    const [errors, setErrors] = useState([])


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const note = {title, body, boolean}
        console.log("This is my handleSubmit", note)
        axios.post("http://localhost:8000/api/notes/new", note)
        .then((res) => {
            console.log("This is my post request: ", res)
            navigate("/")
        })
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        })
    }

    return (
        <div>
            {errors.map((err,index) => <p key={index}>{err}</p>)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Note Body</label>
                    <input type="text" onChange={(e) => setBody(e.target.value)} />
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-dark'>Create a Note</button> | <button className='btn btn-outline-danger'><Link to={'/'}>Cancel</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Create