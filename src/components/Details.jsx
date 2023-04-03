import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

const Details = () => {
    const [note, setNote] =useState("")
    const {id} = useParams();
    // const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
        .then((res) =>{
            console.log("This is our details get request: ", res.data)
            setNote(res.data)
        })
        .catch(err => console.log("This is our details get error", err))
    }, [id]);

    return (
        <div>
            <button className='btn btn-outline-dark'><Link to='/'>Home</Link></button>
            {
            note ?
            <div>
                <h1>{note.title}</h1>
                <h3>{note.body}</h3>
            </div> :
            <h1>The Note is not available!</h1>
            }
        </div>
    )
}

export default Details