import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



const Display = () => {
    const [noteList, setNoteList] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/api/notes')
        .then((bucket) => {
            console.log('This is my get bucket: ', bucket.data)
            setNoteList(bucket.data)
        })
        .catch((error) => {console.log('This is our catch Errrooorr: ', error)})
    }, [loaded])

    //handle delete function
    const handleDelete = (e, id) => {
        axios.delete(`http://localhost:8000/api/notes/${id}`)
        .then((res) =>{
            console.log("Deleting this note: ", res)
            setLoaded(!loaded)
        })
        .catch((err) => console.log("This is our handleDelte catch error: ", err))
    }

    return (
        <div>
            <button className='btn btn-outline-dark'><Link to={'/create'}>Write a Note</Link></button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        noteList.map((glove,i) => {
                            return(
                                <tr key={i} >
                                    <td>
                                        <h3>{glove.title}</h3>
                                        <h6>{glove.body}</h6>
                                    </td>
                                    <td><button className='btn btn-outline-dark'><Link to={`/details/${glove._id}`}>View</Link></button> | 
                                    <button className='btn btn-outline-dark'><Link to={`/update/${glove._id}`}>Edit</Link></button> | 
                                    <button className='btn btn-outline-danger' onClick={(e) => {handleDelete(e, glove._id)}}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Display