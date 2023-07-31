import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const AddComment = ({data}) => {
    const [username, setUsername] = useState()
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem('userDetails')).username)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const comment = { username, body }
        
        const response = await fetch('/api/askposts/' + data._id + '/comment', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setBody('')
            setError(null)
            window.location.reload(false)
            console.log('new comment addded')
        }
    }
    return (  
        <div className="addComment-container" class="px-8 py-4 bg-gray-300 rounded-2xl">
            <div className="header" class="flex flex-row justify-between">
                <h1 class="text-lg font-bold" value={'anon_user'}>Reply...</h1>
            </div>
            <div className="body" class="w-full">
                <textarea placeholder="Type your reply here..." class="w-full rounded-lg p-4 mt-4" onChange={(e) => setBody(e.target.value)} value={body}/>
            </div>
            <div className="footer" class="mt-4 mb-2 flex justify-start gap-8">
                <button>Cancel</button>
                <button onClick={handleSubmit}>Post</button>
            </div>

            {error && <div className="error">
                            {error}
                        </div>}
            
        </div>
    )}
 
export default AddComment;