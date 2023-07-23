import { useState } from "react"

const EditPostModal = ({show, onClose, data}) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    
    if(!show){
        return null
    }

    const handleSave = async (e) => {
        e.preventDefault()

        const post = {title, body}

        console.log('/api/askposts/' + data)
        const response = await fetch('/api/askposts/' + data, {
            method: 'PATCH',
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
            onClose()
            console.log('post updated successfully!')
        }
    }

    return (
        <form className="patch">
            <div className="modal fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="modal-content w-2/5 bg-white rounded-2xl drop-shadow-2xl">
                    <div className="modal-header px-10 py-6 bg-teal rounded-t-2xl border border-black">
                        <h3 className="modal-title m-0 text-white">Edit Post</h3>
                    </div>
                    <div className="modal-body px-10 py-8 border-l border-r border-black">
                        <div className="edit-displayName flex flex-col gap-0.5 mb-2">
                            <label htmlFor="displayName">Title</label>
                            <input type="text" required className="border border-neutral-500 rounded-lg" onChange={(e) => setTitle(e.target.value)} value={title}/>
                        </div>
                        <div className="edit-bio flex flex-col gap-0.5 mt-2">
                            <label htmlFor="bio">Body</label>
                            <input type="text" required className="border border-neutral-500 rounded-lg" onChange={(e) => setBody(e.target.value)} value={body}/>
                        </div>
                        {error && <div className="error">
                            {error}
                        </div>}
                        <div className="modal-footer px-10 py-6 border-b border-l border-r border-black rounded-b-2xl">
                            <button onClick={handleSave} className="bg-mint text-white px-4 py-2 rounded-lg">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
 
export default EditPostModal;
