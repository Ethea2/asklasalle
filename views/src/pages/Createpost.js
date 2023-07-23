import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Createpost = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {title, body}

        const response = await fetch('/api/askposts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setTitle('')
            setTitle('')
            setBody('')
            setError(null)
            console.log('new post addded')
        }
    }
    return (

       <>

            <div className="nav" class="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>

            <form className="create-post" onSubmit={handleSubmit}>
                <h1>Create a new post</h1>

                <label>Post anonymously</label>
                <input type="checkbox" required="true" onChangeCapture={(e) => setUsername(e.target.value)} value={'anon_user'}/>

                <label>Post Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>

                <label>Post Body</label>
                <input type="text" onChange={(e) => setBody(e.target.value)} value={body}/>

                <button>Post</button>

                {error && <div className="error">
                    {error}
                </div>}
            </form>

            <button onClick={() => navigate(-1)}>Cancel</button>
       
       </>

     );
}
 
export default Createpost;