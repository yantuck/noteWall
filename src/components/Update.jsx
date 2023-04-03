import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'

const Update = (props) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [boolean, setBoolean] = useState(false)

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
        .then((res) =>{
            console.log("This is our update get request: ", res.data)
            setTitle(res.data.title)
            setBody(res.data.body)
            setBoolean(res.data.boolean)
        })
        .catch(err => console.log("This is our details get error", err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const noteObj = {title,body,boolean}
        axios.put(`http://localhost:8000/api/notes/${id}`, noteObj)
        .then((res) =>{
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log("This is my update page error: ", err))
    }

        const { removeFromDom } = props;
        
        const handleDelete = (id) => {
            axios.delete(`http://localhost:8000/api/notes/${id}`)
                .then(res => {
                    removeFromDom(id)
                    navigate('/')
                })
                .catch(err => console.error(err));
        }

    return (
        <div>
            <button className='btn btn-outline-secondary'><Link to={'/'}>Go back home</Link></button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Note Body</label>
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-dark'>Update Note</button> | 
                    <button className='btn btn-outline-danger' onClick={(e) => {handleDelete(id)}}>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default Update