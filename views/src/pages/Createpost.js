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
            setBody('')
            setError(null)
            navigate(-1)
            console.log('new post addded')
        }
    }
    return (

       <>

            <div className="nav" class="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>

            <div className="create-post mt-14">
                <div className="form-container" class="border border-black w-4/5 p-6 flex flex-col m-auto">
                    <div className="header w-11/12 flex mb-4 m-auto">
                        <h1 class="text-2xl font-extrabold">Create a new post</h1>
                    </div>

                    <div className="body w-11/12 flex flex-col gap-4 m-auto">

                        <div className="title flex flex-col gap-2">
                            <label class="text-xl font-bold text-teal">Post Title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} class="border border-neutral-300 bg-neutral-200 p-2 rounded-lg shadow-md shadow-gray-300"/>
                        </div>

                        <div className="post-body flex flex-col gap-2">
                            <label class="text-xl font-bold text-teal">Post Body</label>
                            <textarea type="text" onChange={(e) => setBody(e.target.value)} value={body} class="border border-neutral-300 bg-neutral-200 p-8 rounded-lg shadow-md shadow-gray-300"/>
                        </div>

                    </div>

                    <div className="footer w-11/12 mt-8 m-auto flex justify-between">

                        <div className="post-anon flex justify-center">
                            <div className="anon-container bg-gray-300 rounded-lg px-4 py-2 flex gap-2">
                                <label value={'anon_user'} class="font-semibold text-sm">Posting anonymously</label>
                            </div>
                        </div>

                        <div className="buttons flex gap-8">
                            <button onClick={() => navigate(-1)} class="text-red-700 font-semibold">Cancel</button>
                            <button onClick={handleSubmit} class="bg-teal text-white font-semibold px-8 py-2 rounded-xl">Post</button>
                        </div>

                        {error && <div className="error">
                            {error}
                        </div>}
                    </div>
                </div>
            </div>
       
       </>

     );
}
 
export default Createpost;